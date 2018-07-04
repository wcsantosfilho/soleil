const express = require('express')
const auth = require('./auth')

module.exports = function(server) {

    /*
     * Rotas protegidas por Token JWT
     */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)

    // Rotas de Pessoas e Colaboradores
    const pessoa = require('../api/pessoa/pessoaService')
    pessoa.register(protectedApi, '/pessoa')

    const colaborador = require('../api/colaborador/colaboradorService')
    colaborador.register(protectedApi, '/colaborador')

    /*
     * Rotas abertas
     */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
    openApi.post('/userCredentials', AuthService.userCredentials)
    
}