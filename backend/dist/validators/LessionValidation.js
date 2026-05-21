"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonIdValidation = exports.courseIdValidation = exports.updateLessonValidation = exports.createLessonValidation = void 0;
const express_validator_1 = require("express-validator");
exports.createLessonValidation = [
    (0, express_validator_1.param)("courseId").isMongoId().withMessage("Invalid course id"),
    (0, express_validator_1.body)("title")
        .trim()
        .notEmpty()
        .withMessage("Lesson title is required"),
    (0, express_validator_1.body)("type")
        .isIn(["video", "pdf", "text", "link"])
        .withMessage("Lesson type must be video, pdf, text, or link"),
    (0, express_validator_1.body)("contentUrl")
        .optional()
        .isString()
        .withMessage("Content URL must be a string"),
    (0, express_validator_1.body)("order")
        .optional()
        .isNumeric()
        .withMessage("Order must be a number"),
    (0, express_validator_1.body)("duration")
        .optional()
        .isNumeric()
        .withMessage("Duration must be a number"),
    (0, express_validator_1.body)("isPreview")
        .optional()
        .isBoolean()
        .withMessage("isPreview must be boolean"),
];
exports.updateLessonValidation = [
    (0, express_validator_1.param)("lessonId").isMongoId().withMessage("Invalid lesson id"),
    (0, express_validator_1.body)("title")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Lesson title cannot be empty"),
    (0, express_validator_1.body)("type")
        .optional()
        .isIn(["video", "pdf", "text", "link"])
        .withMessage("Lesson type must be video, pdf, text, or link"),
    (0, express_validator_1.body)("contentUrl")
        .optional()
        .isString()
        .withMessage("Content URL must be a string"),
    (0, express_validator_1.body)("order")
        .optional()
        .isNumeric()
        .withMessage("Order must be a number"),
    (0, express_validator_1.body)("duration")
        .optional()
        .isNumeric()
        .withMessage("Duration must be a number"),
    (0, express_validator_1.body)("isPreview")
        .optional()
        .isBoolean()
        .withMessage("isPreview must be boolean"),
];
exports.courseIdValidation = [
    (0, express_validator_1.param)("courseId").isMongoId().withMessage("Invalid course id"),
];
exports.lessonIdValidation = [
    (0, express_validator_1.param)("lessonId").isMongoId().withMessage("Invalid lesson id"),
];
