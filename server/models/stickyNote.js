const mongoose = require("mongoose")
const Schema = mongoose.Schema

var stickyNote = new Schema({
    content: { type: String, default: '' },
    date: { type: String, default: '' },
    posX: { type: Number, default: 0 },
    posY: { type: Number, default: 0 },
})

const Data = mongoose.model("Data", stickyNote)

module.exports = Data
