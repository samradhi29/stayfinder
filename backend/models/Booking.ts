import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBooking extends Document {
  user: Types.ObjectId;       // reference to User
  listing: Types.ObjectId;    // reference to Listing
  bookingDate: Date;          // when user booked
  startDate: Date;            // booking start date
  endDate: Date;              // booking end date
  status: string;             // e.g. "pending", "confirmed", "cancelled"
}

const BookingSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  listing: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
  bookingDate: { type: Date, default: Date.now },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
});

export default mongoose.model<IBooking>("Booking", BookingSchema);
