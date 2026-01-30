const mongoose = require("mongoose");

const connect_Db_register = async()=> {
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/registeraccount_gunaso"  
        );
        console.log("Mongoose for creating account successfully connected");
    } catch (error) {
        console.log("MongoDB connection for registering failed", error);
    }
}

module.exports = {connect_Db_register};