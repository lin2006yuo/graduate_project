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
    }],
    avatar: { type: String, default: "localhost:3000/uploads/default.png" },
    jl: {type: Array}
})

module.exports = companySchema