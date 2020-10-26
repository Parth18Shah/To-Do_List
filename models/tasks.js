const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = Schema({
    task: {
        type: String,
    },
    isDone: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Tasks", taskSchema);