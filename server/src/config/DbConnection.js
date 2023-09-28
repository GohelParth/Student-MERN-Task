import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Database Connection Configuration
const ConnectMongo = async () => {
  const Connection = await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  if (!Connection) {
    console.log("unable to connect database !");
  } else {
    console.log("Connected to MongoDB Cloud Successfully !");
  }
};

export { ConnectMongo };
