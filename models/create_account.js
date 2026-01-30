const mongoose = require("mongoose");

const create_account_gunaso = new mongoose.Schema({
    display_name : {
        type:String,
    },
    full_name: {
        type:String,
    },
    email_address: {
        type: String
    },
    password: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Register_Account",create_account_gunaso);