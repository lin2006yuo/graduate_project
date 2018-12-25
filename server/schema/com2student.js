const mongoose = require('mongoose')
const Schema = mongoose.Schema

const com2studentSchema = new Schema({
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'companyModel'
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'studentModel'
    }
})

module.exports = com2studentSchema