const mongoose = require("mongoose");

const connect_Db_register = async () => {
  try {
    if (mongoose.connection.readyState === 1) return; // already connected

    await mongoose.connect(process.env.atlas_url);
    console.log("Mongoose for creating account successfully connected");
  } catch (error) {
    console.error("MongoDB connection for registering failed", error);
    process.exit(1);
  }
};

module.exports = { connect_Db_register };
