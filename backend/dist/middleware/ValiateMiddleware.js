"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (error) {
        const errors = error instanceof zod_1.ZodError ? error.issues : [{ message: "Invalid request data" }];
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors,
        });
    }
};
exports.validateRequest = validateRequest;
