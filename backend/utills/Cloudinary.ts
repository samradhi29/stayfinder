import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: "dpocor2et",
  api_key: "152933493972496",
  api_secret: "MVU6u1kxgoMn--YKZlqnnXjfbhE",
});

export const uploadToCloudinary = async (buffer: Buffer, filename: string) => {
  try {
    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: "listings" }, (error, result) => {
        if (result) resolve(result);
        else reject(error);
      });
      Readable.from(buffer).pipe(stream);
    });
    return result;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new Error("Image upload failed");
  }};