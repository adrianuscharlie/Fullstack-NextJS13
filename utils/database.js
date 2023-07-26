import mongoose, { mongo } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is Connected");
    return;
  }
  try {
    await mongoose.connect(
      process.env.MONGODB_URI,
      {
        dbName: "sambatdotcom",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    isConnected = true;
  } catch (error) {
    console.log(error)
  }
};
