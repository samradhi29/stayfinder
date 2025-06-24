import express from "express";
import { createListing, getHostListings, deleteListing } from "../controller/Hostcontroller.ts";
import { verifyToken } from "../middleware/auth.ts";
import upload from "../middleware/multer.ts";

const router = express.Router();

router.post("/listings", verifyToken, upload.array("images"), createListing);
router.get("/listings", verifyToken, getHostListings);
router.delete("/listings/:id", verifyToken, deleteListing);

export default router;