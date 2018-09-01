const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./user')
const env = require('../../.env')

/* expressão regular do formato do e-mail */
const emailRegex = /\S+@\S+\.\S+/
/* expressão regular da senha: 6 a 20 caracteres, uma minúscula, uma maiúscula e um caractere especial */
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%;]).{6,20})/

/* Rotina de resposta de erros */
const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({errors})
}

/* Faz o login */
const login = (req, res, next) => {
    /* A requisição traz email e password */
    const email = req.body.email || ''
    const password = req.body.password || ''

    /* Busca o usuário pelo email */
    User.findOne({email}, (err, user) => {
        if(err) {
            return sendErrorsFromDB(res, err)
        } else if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ uid: user }, env.authSecret, { expiresIn: "1 day" })
            /* Destructuring do objeto user em nome e email */
            const { name, email } = user
            /* A resposta do login é um JSON (nome, email e token) */
            res.json({ name, email, token })
        } else {
            return res.status(400).send({errors: ['Usuário/Senha inválidos']})
        }
    })
}

/* Verifica se o token é válido */
const validateToken = (req, res, next) => {
    const token = req.body.token || ''

    jwt.verify(token, env.authSecret, function(err, decoded) {
        return res.status(200).send({valid: !err})
    })
}

/* Retorna as credenciais do usuário logado */
const userCredentials = (req, res, next) => {
    const token = req.body.token || ''
    jwt.verify(token, env.authSecret, function(err, decoded) {
        if (err) { 
            return res.status(500).send({errors: ['Falha na autenticação']})
        } else {
            /* "password: 0" indica para o Mongoose que a password não vai retornar */
            User.findById(decoded.uid._id, { password: 0 }, (err, user) => {
                if(err) {
                    return sendErrorsFromDB(res, err)
                } else {
                    res.status(200).send(user)
                }
            })
        }
    })
}

/* Cria novo usuário na aplicação */
const signup = (req, res, next) => {
    const name = req.body.name || ''
    const email = req.body.email || ''
    const password = req.body.password || ''
    const confirmPassword = req.body.confirm_password || ''

    if(!email.match(emailRegex)) {
        return res.status(400).send({errors: ['O e-mail informado está inválido']})
    }

    if(!password.match(passwordRegex)) {
        return res.status(400).send({errors: [
            "Senha deve ter: uma letra maiúscula, uma letra minúscula, um número, um caractere especial(@#$%) e tamanho entre 6 e 20 caracteres."
        ]})
    }

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    if(!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({errors: ['Senhas não conferem']})
    }

    User.findOne({ email }, (err, user) => {
        if(err) {
            return sendErrorsFromDB(res, err)
        } else if (user) {
            return res.status(400).send({ errors: ['Usuário já cadastrado'] })
        } else {
            const newUser = new User({ name, email, password: passwordHash })
            newUser.save(err => {
                if(err) {
                    return sendErrorsFromDB(res, err)
                } else {
                    login(req, res, next)
                }
            })
        }
    })
}

module.exports = { login, signup, validateToken, userCredentials }  