import mongoose, { Document, Schema, model } from "mongoose";

export interface IImage {
  filename: string;
  url: string;
}

export interface IListing extends Document {
  // host: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  image: IImage;                 // ⬅️ single image instead of images[]
  price: number;
  location: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  latitude: Number,
      longitude: Number
}

const ImageSchema = new Schema<IImage>({
  filename: { type: String, required: true },
  url: { type: String, required: true },
});

const listingSchema = new Schema<IListing>(
  {
    // host: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    image: { type: ImageSchema, required: true },  // ⬅️ single image object
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    latitude: {type : Number},
      longitude: {type : Number}
  },
  { timestamps: true }
);

const Listing = model<IListing>("Listing", listingSchema);

export default Listing;
