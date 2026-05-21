import { body, param } from "express-validator";

export const createLessonValidation = [
  param("courseId").isMongoId().withMessage("Invalid course id"),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Lesson title is required"),

  body("type")
    .isIn(["video", "pdf", "text", "link"])
    .withMessage("Lesson type must be video, pdf, text, or link"),

  body("contentUrl")
    .optional()
    .isString()
    .withMessage("Content URL must be a string"),

  body("order")
    .optional()
    .isNumeric()
    .withMessage("Order must be a number"),

  body("duration")
    .optional()
    .isNumeric()
    .withMessage("Duration must be a number"),

  body("isPreview")
    .optional()
    .isBoolean()
    .withMessage("isPreview must be boolean"),
];

export const updateLessonValidation = [
  param("lessonId").isMongoId().withMessage("Invalid lesson id"),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Lesson title cannot be empty"),

  body("type")
    .optional()
    .isIn(["video", "pdf", "text", "link"])
    .withMessage("Lesson type must be video, pdf, text, or link"),

  body("contentUrl")
    .optional()
    .isString()
    .withMessage("Content URL must be a string"),

  body("order")
    .optional()
    .isNumeric()
    .withMessage("Order must be a number"),

  body("duration")
    .optional()
    .isNumeric()
    .withMessage("Duration must be a number"),

  body("isPreview")
    .optional()
    .isBoolean()
    .withMessage("isPreview must be boolean"),
];

export const courseIdValidation = [
  param("courseId").isMongoId().withMessage("Invalid course id"),
];

export const lessonIdValidation = [
  param("lessonId").isMongoId().withMessage("Invalid lesson id"),
];