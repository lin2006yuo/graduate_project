const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const swiperPicSchema = new Schema({
    title: { type: String, default: '' },
    picUrl: { type: String },
    isShow: { type: Boolean, default: true },
    date: { type: Date, default: Date.now() }
})

module.exports = swiperPicSchema