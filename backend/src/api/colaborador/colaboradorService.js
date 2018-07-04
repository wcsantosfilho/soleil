const colaborador = require('./colaborador')
const pessoa = require('../pessoa/pessoa')
const errorHandler = require('../common/errorHandler')
const ObjectId = require('mongoose').Types.ObjectId
const co = require('co')

const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    if(dbErrors.errors) {
        _.forIn(dbErrors.errors, error => errors.push(error.message))
        return res.status(400).json({errors})
    } else {
        return res.status(400).json(dbErrors)
    }
}

colaborador.methods(['get', 'post', 'put', 'delete'])
colaborador.updateOptions({ new: true, runValidators: true})
colaborador.after('post', errorHandler).after('put', errorHandler)

colaborador.route('count', (req, res, next) => {
    colaborador.count((error, value) => {
        if (error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

colaborador.route('addColaborador', (req, res, next) => {
    const pessoaId = req.body.id
    const matricula = req.body.matricula
    const dataAdmin = req.body.dataAdmin
    const dataDeslig = req.body.dataDeslig
    pessoa.findOne({ _id: pessoaId}, (err, pessoa) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else {
            var colab = new colaborador({ matricula, dataAdmin, dataDeslig, pessoa: pessoa._id })
            colab.save( (err, colabResult) => {
                if(err) {
                    console.log(err)
                    //res.status(500).send(err)
                    return sendErrorsFromDB(res, err)
                } else {
                    res.status(200).send(colabResult)
                }
            })
        }
    })
})

colaborador.route('colaboradoresComPessoas', (req, res, next) => {
    colaborador.aggregate([
        { $lookup: { from: "pessoas", 
                    localField: "pessoa", 
                    foreignField: "_id", 
                    as: "pessoas" }
        }], (err, colabs) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else {
            res.status(200).send(colabs)
        }
    })
})

colaborador.route('colaboradorGetSubordinados', (req, res, next) => {

    const gestorId = req.body.gestorId
    colaborador.aggregate([
        { $match: { gestor: new ObjectId(gestorId)}},
        { $lookup: { from: "pessoas", 
                    localField: "pessoa", 
                    foreignField: "_id", 
                    as: "detalhePessoa" }
        }], (err, colabs) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else {
            res.status(200).send(colabs)
        }
    })
})

module.exports = colaborador