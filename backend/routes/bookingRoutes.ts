import express from "express";
import { createBooking } from "../controller/Bookingcontroller.ts"
import { verifyToken } from "../middleware/auth.ts"
const router = express.Router();

router.post("/book", verifyToken, createBooking);

export default router;
