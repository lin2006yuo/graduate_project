const mongoose = require("mongoose")
const Schema = mongoose.Schema

const chatSchema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    // fromModel: { type: String, required: true, enum: ['studentModel', 'companyModel'] },
    // toModel: { type: String, required: true, enum: ['studentModel', 'companyModel'] },
    chat_id: { type: String, required: true },
    content: { type: String, required: true },
    read: { type: Boolean, default: false },
    create_time: { type: Number },
})

module.exports = chatSchema
