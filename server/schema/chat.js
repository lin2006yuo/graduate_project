const mongoose = require("mongoose")
const Schema = mongoose.Schema

const chatSchema = new Schema({
    chatlist: [
        {
            from: { type: String, required: true },
            to: { type: String, required: true },
            read: { type: Boolean, default: false },
            create_time: { type: Number },
            content: { type: String, required: true },
        }
    ],
    chator: {
      creator: { type: mongoose.Types.ObjectId, ref: 'studentModel' },
      target: { type: mongoose.Types.ObjectId, ref: 'companyModel' }
    },
    // fromModel: { type: String, required: true, enum: ['studentModel', 'companyModel'] },
    // toModel: { type: String, required: true, enum: ['studentModel', 'companyModel'] },
    chat_id: { type: String, required: true },
})

module.exports = chatSchema
