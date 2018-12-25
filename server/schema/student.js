const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    username: {type: String},
    pwd: {type: String},
    name:{type: String},
    sex: {type: Number},
    birthday: {type:Date},
    ethnic: {type: String},
    city: {type: Array},
    academy: {type: String},
    grade: {type: String},
    major: {type: String},
    phone: {type: Number},
    QQ: {type: Number},
    eMail: {type: String},
    hasJl: {type: Boolean, default: false}
})

module.exports = studentSchema