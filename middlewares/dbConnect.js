const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://kaushikaditya90:mongodb@moviedb.8ckn3.mongodb.net/user_management?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (err) {
    console.error("======", err);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  mongoose.connection.close();
};

module.exports = {
  connectDB,
  disconnectDB,
};
