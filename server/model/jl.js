const mongoose = require('mongoose')
const jlSchema = require('../schema/jl')

const jlModel = mongoose.model('jlModel', jlSchema)

module.exports = jlModel