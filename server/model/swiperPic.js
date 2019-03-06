const mongoose = require('mongoose')
const swiperPicSchema = require('../schema/swiperPic')

const swiperPicModel = mongoose.model('swiperPicModel', swiperPicSchema)

module.exports = swiperPicModel