const mongoose = require('mongoose')
const companySchema = require('../schema/company')

const companyModel = mongoose.model('companyModel', companySchema)

module.exports = companyModel