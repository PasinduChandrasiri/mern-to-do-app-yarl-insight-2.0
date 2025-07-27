const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = async () => {
    try{
        console.log(process.env.DB_CONNECTION_STRING);
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Database connected");
    } catch (error) {
        console.error("Failed to connect database");
    }
};

module.exports = connectToDb;