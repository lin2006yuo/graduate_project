const mongoose = require("mongoose")
const chatListSchema = require("../schema/chatList")

const chatListModel = mongoose.model("chatListModel", chatListSchema)

module.exports = chatListModel
