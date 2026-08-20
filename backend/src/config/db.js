const mongoose = require('mongoose');
const logger = require('./logger');
const dns = require('dns');

// Configure custom fast DNS servers to prevent timeout/refused errors on slow local networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (err) {
  logger.warn(`Failed to set custom DNS servers: ${err.message}`);
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    });
    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`❌ MongoDB connection error: ${error.message}`);
    logger.warn('⚠️ Server continuing without MongoDB. Some features will be disabled.');
  }
};

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('reconnected', () => {
  logger.info('MongoDB reconnected');
});

module.exports = connectDB;
