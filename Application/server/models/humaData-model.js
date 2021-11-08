const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HumaData = new Schema(
    {
        user: { type: String, required: true },
        time: { type: [String], required: true },
        value: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('HumaData', HumaData)