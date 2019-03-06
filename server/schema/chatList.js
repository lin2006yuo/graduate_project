const mongoose = require("mongoose")
const Schema = mongoose.Schema

const chatListchema = new Schema({
    studentList: {
        type: Schema.Types.ObjectId,
        ref: "studentModel"
    },
    companyList: {
        type: Schema.Types.ObjectId,
        ref: 'companyModel'
    },
    from: { type: 'String', required:true },
})

module.exports = chatListchema
