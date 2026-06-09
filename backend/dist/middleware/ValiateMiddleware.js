"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
const validateRequest = (schema) => (req, res, next) => {
    try {
        const parsed = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        const requestData = parsed;
        if (requestData.body)
            req.body = requestData.body;
        if (requestData.params)
            req.params = requestData.params;
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            console.log("Zod Validation Errors :");
            console.log(error.flatten());
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.issues,
            });
        }
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Invalid request data",
        });
    }
};
exports.validateRequest = validateRequest;
