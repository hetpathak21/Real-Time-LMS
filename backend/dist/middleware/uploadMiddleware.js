"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileUpload = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const appError_1 = require("../utils/appError");
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: async (_req, file) => {
        const isVideo = file.mimetype.startsWith("video/");
        const isDocument = file.mimetype === "application/pdf" ||
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
const fileFilter = (_req, file, cb) => {
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
        return cb(new appError_1.AppError("Only image, video, and document files are allowed", 400));
    }
    cb(null, true);
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    // 100MB limit for videos/documents
    limits: {
        fileSize: 100 * 1024 * 1024,
    },
});
const profileUploadDirectory = path_1.default.join(process.cwd(), "uploads", "profiles");
if (!fs_1.default.existsSync(profileUploadDirectory)) {
    fs_1.default.mkdirSync(profileUploadDirectory, { recursive: true });
}
const profileStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, profileUploadDirectory);
    },
    filename: (_req, file, cb) => {
        const extension = path_1.default.extname(file.originalname) || ".jpg";
        const safeBaseName = path_1.default
            .basename(file.originalname, extension)
            .replace(/[^a-zA-Z0-9-_]/g, "-")
            .toLowerCase();
        cb(null, `${Date.now()}-${safeBaseName}${extension}`);
    },
});
exports.profileUpload = (0, multer_1.default)({
    storage: profileStorage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
