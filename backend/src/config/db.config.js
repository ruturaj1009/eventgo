const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/event-management';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    if(conn){
      console.log(`Connected to ${conn.connection.host}`);
    }
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;