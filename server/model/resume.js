const mongoose = require('mongoose')
const resumeSchema = require('../schema/resume')

const resumeModel = mongoose.model('resumeModel', resumeSchema)

module.exports = resumeModel