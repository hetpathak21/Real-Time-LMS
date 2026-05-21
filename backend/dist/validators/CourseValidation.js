"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseListValidation = exports.courseIdValidation = exports.updateCourseValidation = exports.createCourseValidation = void 0;
const express_validator_1 = require("express-validator");
exports.createCourseValidation = [
    (0, express_validator_1.body)("title")
        .trim()
        .notEmpty()
        .withMessage("Course title is required")
        .isLength({ min: 3 })
        .withMessage("Course title must be at least 3 characters"),
    (0, express_validator_1.body)("description")
        .trim()
        .notEmpty()
        .withMessage("Course description is required"),
    (0, express_validator_1.body)("thumbnail")
        .optional()
        .isString()
        .withMessage("Thumbnail must be a valid string"),
    (0, express_validator_1.body)("category")
        .optional()
        .isString()
        .withMessage("Category must be a valid string"),
    (0, express_validator_1.body)("tags")
        .optional()
        .isArray()
        .withMessage("Tags must be an array"),
    (0, express_validator_1.body)("tags.*")
        .optional()
        .isString()
        .withMessage("Each tag must be a string"),
];
exports.updateCourseValidation = [
    (0, express_validator_1.param)("courseId")
        .isMongoId()
        .withMessage("Invalid course id"),
    (0, express_validator_1.body)("title")
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage("Course title must be at least 3 characters"),
    (0, express_validator_1.body)("description")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Course description cannot be empty"),
    (0, express_validator_1.body)("thumbnail")
        .optional()
        .isString()
        .withMessage("Thumbnail must be a valid string"),
    (0, express_validator_1.body)("category")
        .optional()
        .isString()
        .withMessage("Category must be a valid string"),
    (0, express_validator_1.body)("tags")
        .optional()
        .isArray()
        .withMessage("Tags must be an array"),
];
exports.courseIdValidation = [
    (0, express_validator_1.param)("courseId")
        .isMongoId()
        .withMessage("Invalid course id"),
];
exports.courseListValidation = [
    (0, express_validator_1.query)("search").optional().isString(),
    (0, express_validator_1.query)("category").optional().isString(),
    (0, express_validator_1.query)("page").optional().isInt({ min: 1 }),
    (0, express_validator_1.query)("limit").optional().isInt({ min: 1 }),
];
