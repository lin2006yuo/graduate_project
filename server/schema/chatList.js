const mongoose = require("mongoose")
const Schema = mongoose.Schema

const chatListchema = new Schema({
    owner: { type: String, required: true },
    chat_id: { type: Array }
})

module.exports = chatListchema
