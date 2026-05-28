"use strict";
// import { Request, Response, NextFunction } from "express";
// import { ZodError, ZodSchema } from "zod";
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
        if (error instanceof zod_1.ZodError) {
            console.log("Zod Validation Errors:");
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
