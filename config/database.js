const mongoose = require("mongoose");

let cached = global._mongooseConn;
if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

module.exports.connect = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 15000,
      maxPoolSize: 5,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("connect success!");
  } catch (error) {
    cached.promise = null;
    console.log("connect Error:", error.message);
    throw error;
  }

  return cached.conn;
};