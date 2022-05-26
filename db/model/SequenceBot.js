const mongoose = require("mongoose")

const Sequence = mongoose.model("SEQUENCEBOT", {
    greens:Number,
    date:String,
    finished:Boolean,
    hourStarted:Number
})
module.exports = Sequence