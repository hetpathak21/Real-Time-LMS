import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import fs from "fs";
import path from "path";
import cloudinary from "../config/cloudinary";
import { AppError } from "../utils/appError";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    const isVideo = file.mimetype.startsWith("video/");
    const isDocument =
      file.mimetype === "application/pdf" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype === "application/msword";

    return {
      folder: "lms/courses",

      // Allowed file extensions
      allowed_formats: [
        // Images
        "jpg",
        "jpeg",
        "png",
        "webp",

        // Videos
        "mp4",
        "mov",
        "avi",
        "mkv",

        // Documents
        "pdf",
        "doc",
        "docx",
      ],

      // Cloudinary resource type
      resource_type: isVideo
        ? "video"
        : isDocument
        ? "raw"
        : "image",
    };
  },
});

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const allowedMimeTypes = [
    // Image MIME types
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",

    // Video MIME types
    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",

    // Document MIME types
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new AppError(
        "Only image, video, and document files are allowed",
        400
      )
    );
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,

  // 100MB limit for videos/documents
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

const profileUploadDirectory = path.join(process.cwd(), "uploads", "profiles");

if (!fs.existsSync(profileUploadDirectory)) {
  fs.mkdirSync(profileUploadDirectory, { recursive: true });
}

const profileStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, profileUploadDirectory);
  },
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname) || ".jpg";
    const safeBaseName = path
      .basename(file.originalname, extension)
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .toLowerCase();

    cb(null, `${Date.now()}-${safeBaseName}${extension}`);
  },
});

export const profileUpload = multer({
  storage: profileStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
