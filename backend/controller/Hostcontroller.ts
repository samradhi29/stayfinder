// controllers/listingController.ts
import { Request, Response, NextFunction } from "express";
import Listing from "../models/Listing";
import { uploadToCloudinary } from "../utills/Cloudinary";
import { AuthRequest } from "../middleware/auth";

export const createListing = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    const images = await Promise.all(
      files.map(async (file) => {
        const result = await uploadToCloudinary(file.buffer, file.originalname);
        return { filename: file.originalname, url: result.secure_url };
      })
    );

    const listing = await Listing.create({
      host: req.userId,
      ...req.body,
      images,
    });

    res.status(201).json(listing);
  } catch (error: any) {
    console.error("Create listing failed:", error);
    res.status(500).json({ message: "Create error", error: error.message });
  }
};

export const getHostListings = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const listings = await Listing.find({ host: req.userId });
    res.json(listings);
  } catch (error: any) {
    console.error("Fetch listings failed:", error);
    res.status(500).json({ message: "Fetch error", error: error.message });
  }
};

export const deleteListing = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const listing = await Listing.findOneAndDelete({ _id: req.params.id, host: req.userId });
    if (!listing) {
      res.status(404).json({ message: "Listing not found" });
      return;
    }
    res.json({ message: "Listing deleted" });
  } catch (error: any) {
    console.error("Delete listing failed:", error);
    res.status(500).json({ message: "Delete error", error: error.message });
  }
};