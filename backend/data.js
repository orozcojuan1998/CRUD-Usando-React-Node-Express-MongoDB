const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema (
    {
        id:Number,
        messagge : String,

    },
    {timestamps : true}

);

module.exports = mongoose.model("Data", DataSchema);