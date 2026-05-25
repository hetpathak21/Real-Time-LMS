import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";
import { AppError } from "../utils/appError";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => {
    return {
      folder: "lms/courses",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      resource_type: "image",
    };
  },
});

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new AppError("Only image files are allowed", 400));
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});