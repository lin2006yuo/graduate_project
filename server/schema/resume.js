const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resumeSchema = new Schema({
    title: {type: String},
    category: {type: Array},
    salary: {type: Number},
    day: {type: Number, default: 1},
    content: {type: String},
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'companyModel'
    },
    date: { type: Date, default: Date.now() }
})

module.exports = resumeSchema