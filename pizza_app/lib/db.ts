import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

const connect = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URL!, {
      dbName: "Pizza-App",
      bufferCommands: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; 
  }
};

export default connect;
