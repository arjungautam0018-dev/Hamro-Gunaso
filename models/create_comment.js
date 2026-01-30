const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    gunasoId:{
        type: String
    },
    commentText :{
        type:String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Register_Account",
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Comment", commentSchema);