const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOOSE_DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
    return conn.connection.getClient()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
};

module.exports = connectDB;