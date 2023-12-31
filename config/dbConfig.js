import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    let connected = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDb connected ${connected.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnection;
