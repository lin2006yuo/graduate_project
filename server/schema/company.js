const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
    username: {type: String},
    pwd: {type: String},
    companyName: {type: String},
    companyIntro: {type: String},
    position: {type: Array, default:[]},
    contact: {type: String},
    phone: {type: String},
    resumes: [{
        type: Schema.Types.ObjectId,
        ref: 'resumeModel'
    }]
})

module.exports = companySchema