const mongoose = require("mongoose")
const Schema = mongoose.Schema

const com2jlSchema = new Schema({
    jlId: {
        type: Schema.Types.ObjectId,
        ref: "jlModel"
    },
    recruitId: {
        type: Schema.Types.ObjectId,
        ref: 'resumeModel'
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "studentModel"
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'companyModel'
    },
    status: { type: Number, default: 1 },
    date: { type: Date, default: Date.now() }
})

module.exports = com2jlSchema
