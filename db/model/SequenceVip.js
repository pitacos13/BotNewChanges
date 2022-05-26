const mongoose = require("mongoose")

const Sequence = mongoose.model("SEQUENCEVIP", {
    greens:Number,
    date:String,
    finished:Boolean,
    hourStarted:Number
})
module.exports = Sequence