import mongoose from "mongoose";

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to database", error.message);
    process.exit(1) // exit with failure
  }
}

export default connectDB;