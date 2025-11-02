const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const connection = process.env.MONGO_URI;

        if (!connection) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        await mongoose.connect(connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;