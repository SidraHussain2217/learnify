const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/lernify");
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("MongoDB Error:", error);
  }
};

module.exports = connectDB;