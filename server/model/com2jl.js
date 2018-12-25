const mongoose = require("mongoose")
const com2jlSchema = require("../schema/com2jl")

const com2jlModel = mongoose.model("com2jlModel", com2jlSchema)

module.exports = com2jlModel
