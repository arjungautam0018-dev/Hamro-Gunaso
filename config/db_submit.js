const mongoose = require("mongoose");


const connectDb_submit = async()=>{
        try {
                await mongoose.connect(
                        "mongodb://127.0.0.1:27017/gunasoDB"    
            
                    );
                    console.log("Mongoose for submission connected successfully")
                } catch (error) {
                        console.error("MongoDB connection failed for submission:", error);
                    }
                }
                
                
                module.exports = {connectDb_submit};
// const connectDb_submit = mongoose.createConnection(
//     "mongodb://127.0.0.1:27017/gunasoDB",
    
// );

// connectDb_submit.on("connected", ()=> {
//     console.log("Mongoose for submission connected successfully");
// });
// connectDb_submit.on("error", (err)=> {
//     console.log("MongoDB for submission can't connect", err);
// });

// const connect_Db_register = mongoose.createConnection(
//     "mongodb://127.0.0.1:27017/registeraccount_gunaso"

// );
// connect_Db_register.on("connected", ()=>{
//     console.log("Mongoose for creating account created successfully")
// });
// connect_Db_register.on("error", (err)=> {
//     console.log("MongoDb for registering can't connect due to", err)
// });

// module.exports={connectDb_submit,connect_Db_register};
