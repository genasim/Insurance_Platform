import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error("Mongo connection string env variable is empty");
  }

  await mongoose.connect(mongoUrl);
  console.log("Successfully connected to mongo db");
};

export default connectDB;
