const mongoose = require("mongoose");

const dbConnect = async () => {
  const DB_URI = process.env.DB_URI;
  try {
    const conn = await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected`);
    return conn;
  } catch (err) {
    console.log(`Error:`, err);
  }
};

module.exports = dbConnect;
