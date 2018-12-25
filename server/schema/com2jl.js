const mongoose = require("mongoose")
const Schema = mongoose.Schema

const com2jlSchema = new Schema({
    jlId: {
        type: Schema.Types.ObjectId,
        ref: "jlModel"
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "studentModel"
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: "companyModel"
    }
})

module.exports = com2jlSchema
