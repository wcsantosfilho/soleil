const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema

const pessoaSchema = new Schema({
    nome: { type: String, required: true },
    dataNasc: { type: Date, required: true },
    sexo: { type: String, required: true, uppercase: true,
        enum: ['F', 'M', 'I']}
})

module.exports = restful.model('pessoa', pessoaSchema)