const mongoose = require("mongoose")
const chatSchema = require("../schema/chat")

const chatModel = mongoose.model("chatModel", chatSchema)

module.exports = chatModel
