const mongoose = require('mongoose')
const studentSchema = require('../schema/student')

const studentModel = mongoose.model('studentModel', studentSchema)

module.exports  = studentModel