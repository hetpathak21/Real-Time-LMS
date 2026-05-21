import { body, param, query } from "express-validator";

export const createCourseValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Course title is required")
    .isLength({ min: 3 })
    .withMessage("Course title must be at least 3 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Course description is required"),

  body("thumbnail")
    .optional()
    .isString()
    .withMessage("Thumbnail must be a valid string"),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a valid string"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),

  body("tags.*")
    .optional()
    .isString()
    .withMessage("Each tag must be a string"),
];

export const updateCourseValidation = [
  param("courseId")
    .isMongoId()
    .withMessage("Invalid course id"),

  body("title")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Course title must be at least 3 characters"),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Course description cannot be empty"),

  body("thumbnail")
    .optional()
    .isString()
    .withMessage("Thumbnail must be a valid string"),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a valid string"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),
];

export const courseIdValidation = [
  param("courseId")
    .isMongoId()
    .withMessage("Invalid course id"),
];

export const courseListValidation = [
  query("search").optional().isString(),
  query("category").optional().isString(),
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1 }),
];