const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const Mongo_Url = process.env.MONGO_URI;

const dbConnection = async () => {
  try {
    await mongoose.connect(Mongo_Url);
    console.log("db connected");
  } catch (error) {
    console.log("db not  connected");
  }
};
module.exports = dbConnection;
