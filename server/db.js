const mongoose = require("mongoose")
const Schema = mongoose.Schema
const resumeModel = require("./model/resume")
const companyModel = require("./model/company")
const studentModel = require("./model/student")
const jlModel = require("./model/jl")
const com2student = require("./model/com2student")
const com2jlModel = require("./model/com2jl")
const swiperPicModel = require("./model/swiperPic")
const chatModel = require("./model/chat")
const chatListModel = require('./model/chatList')

//管理员
const adminSchema = new Schema({
    username: { type: String },
    pwd: { type: String },
    time: { type: Date, default: Date.now }
})

//校园公告
const AnnounceSchema = new Schema({
    title: { type: String },
    pulisher: { type: String, default: "韶关学院" },
    time: { type: Date },
    content: { type: String }
})

mongoose.connect(
    "mongodb://127.0.0.1:27017/graduProject",
    function(error) {
        if (error) {
            console.log("连接数据库失败" + error)
        } else {
            console.log("连接数据库成功")
        }
    }
)
// database.connection.on('error', function(error){
//   console.log('数据库test_nodeVue连接失败：' + error)
//   return
// })
// database.connection.once('open', function () {
//     console.log('数据库连接成功')
// })

const db = {
    adminModel: mongoose.model("adminModel", adminSchema),
    AnnounceModel: mongoose.model("AnnounceModel", AnnounceSchema),
    resumeModel,
    companyModel,
    studentModel,
    jlModel,
    com2student,
    com2jlModel,
    swiperPicModel,
    chatModel,
    chatListModel
}

module.exports = db
