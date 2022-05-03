const mongoose = require('mongoose') 

const todoSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    complete:{
        type:Boolean,
        default:false
    }
})

const todo = mongoose.model("todo",todoSchema);

module.exports = todo;