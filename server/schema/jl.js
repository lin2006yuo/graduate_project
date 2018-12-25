const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jlSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'studentModel'
    },
    edu: {type: String},
    isT: {type: Boolean},
    posi: {type: String},
    rank: {type: String},
    excepCity: {type: Array},
    excepMon: {type: String},
    certificate: {type: String},
    lang: {type: Object, default: {
        name: "",
        score: ""
    }},
    textarea: {type: String},
    // name: { type: String },
    // sex: { type: Boolean },
    // birthday: { type: String },
    // sex: { type: Number },
    // birthday: { type: Date },
    // ethnic: { type: String },
    // city: { type: Array },
    // academy: { type: String },
    // grade: { type: String },
    // major: { type: String },
    // phone: { type: Number },
    // QQ: { type: Number },
    // eMail: { type: String }
})

module.exports = jlSchema