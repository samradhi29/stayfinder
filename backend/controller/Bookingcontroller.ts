import { Response } from "express";
import Booking from "../models/Booking";
import { AuthRequest } from "../middleware/auth";

export const createBooking = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId;
  const { listing, startDate, endDate } = req.body as {
    listing: string;
    startDate: string;
    endDate: string;
  };

  if (!userId) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }

  if (!listing || !startDate || !endDate) {
    res.status(400).json({ msg: "Please provide listing and booking dates" });
    return;
  }

  try {
    // Optional: Validate listing exists, dates valid etc.

    const newBooking = new Booking({
      user: userId,
      listing,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    await newBooking.save();

    res.status(201).json({ msg: "Booking successful", booking: newBooking });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};
