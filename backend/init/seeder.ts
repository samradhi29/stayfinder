import mongoose from "mongoose";
import { data as initData } from "./data.ts";
import Listing from "../models/Listing.ts";

export async function seedDB() {
  try {
    await Listing.deleteMany({});
    await Listing.insertMany(initData);
    console.log("✅ Seed data inserted");
  } catch (error) {
    console.error("❌ Failed to seed data:", error);
    throw error; // rethrow so index.ts knows if it failed
  }
}
