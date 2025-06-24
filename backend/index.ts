import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import Hostroutes from "./routes/Hostroutes";
import listingRoute from "./routes/listingRoute";
import authRoutes from "./routes/listingauth";
import bookingroute from "./routes/bookingRoutes";

// import { seedDB } from "./init/seeder.ts";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

const MONGO_URL = process.env.MONGO_URI!;
if (!MONGO_URL) {
  throw new Error("MONGO_URI is not defined");
}

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    // Run seeder here before starting server
    // await seedDB();

    app.use("/host/api", Hostroutes);
    app.use("/api/listings", listingRoute);
    app.use("/api/auth", authRoutes);
    app.use("/api/booking", bookingroute);

    app.listen(8000, () => {
      console.log("Server running on port 8000");
    });
  } catch (err) {
    console.error("MongoDB connection or seeding error:", err);
  }
};

startServer();
