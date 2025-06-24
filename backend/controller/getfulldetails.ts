import { Request, Response, NextFunction } from "express";
import Listing from "../models/Listing";

export const getListingById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json(listing); // Removed 'return' as it's not needed
  } catch (error) {
    console.error("Error fetching listing:", error);
    next(error);
  }
};