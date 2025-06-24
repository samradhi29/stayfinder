import express from "express";
import { getAllListings } from "../controller/Listingcontroller.ts";
import { getListingById } from "../controller/getfulldetails.ts";
const router = express.Router();

router.get("/", getAllListings);
router.get("/:id" , getListingById)

export default router;