const mongoose = require("mongoose");

const submit_gunaso_schema1 = new mongoose.Schema({
    category: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    files: [
        {
            originalName: String,
            fileName: String,
            path: String,
            mimetype: String,
            size: Number
        }
    ],
    likeCount:{
        type:Number,
        default:0,
    },
    commentCount:{
        type:Number,
        default:0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Gunaso_Submit", submit_gunaso_schema1);
