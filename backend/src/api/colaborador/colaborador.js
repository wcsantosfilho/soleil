const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId


const colaboradorSchema = new Schema({
    matricula: { type: Number, min: 1, required: true, index: true, unique: true },
    dataAdmin: { type: Date, required: true },
    dataDeslig: { type: Date, required: false },
    pessoa: { type: ObjectId, ref: 'pessoa' }
})

module.exports = restful.model('colaborador', colaboradorSchema)