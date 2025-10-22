const mongoose = require("mongoose");

const connectDB = async ()=>{
      await mongoose.connect("mongodb+srv://NamasteNode:TechTinder@tech.syotinb.mongodb.net/techTinder");
}

module.exports = connectDB
