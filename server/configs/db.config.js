// mongoose.config.js

const mongoose = require('mongoose');

const connectDB = async (DB) => {
    try {
        const conn = await mongoose.connect(DB);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
