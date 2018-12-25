const mongoose = require('mongoose')
const com2studentSchema = require('../schema/com2student')

const com2studentModel = mongoose.model('com2studentModel', com2studentSchema)

module.exports = com2studentModel