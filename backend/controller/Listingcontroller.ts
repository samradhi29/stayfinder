import { Request, Response } from "express";
import Listing from "../models/Listing.ts";

// GET all listings with minimal info (title + image URL)


// GET /api/listings?location=&minPrice=&maxPrice=&startDate=&endDate=
export const getAllListings = async (req: Request, res: Response) => {
  try {
    const { location, minPrice, maxPrice, startDate, endDate } = req.query;

    const filter: any = {};

    // Location filter (case-insensitive partial match)
    if (location && typeof location === "string") {
      filter.location = { $regex: location, $options: "i" };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Date range filter (assuming listings have `availableFrom` or similar)
    if (startDate || endDate) {
      filter.availableFrom = {};
      if (startDate) filter.availableFrom.$gte = new Date(startDate as string);
      if (endDate) filter.availableFrom.$lte = new Date(endDate as string);
    }

    const listings = await Listing.find(filter);
    res.json(listings);
  } catch (error) {
    console.error("Error in getAllListings:", error);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
};


// // GET single listing by ID with full details
// // ✅ Make sure it's exported
// export const getListingById = async (req: Request, res: Response) => {
//   try {
//     const listing = await Listing.findById(req.params.id); // Changed 'listings' to 'listing'
//     if (!listing) {
//       return res.status(404).json({ error: "Listing not found" }); // Added 'return'
//     }
//     return res.json(listing); // Added 'return' for consistency
//   } catch (error) {
//     console.error("Error fetching listing:", error); // Added logging
//     return res.status(500).json({ error: "Failed to fetch listing" }); // Added 'return'
//   }
// };