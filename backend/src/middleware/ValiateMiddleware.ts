import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

export const validateRequest =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error: unknown) {
      const errors =
        error instanceof ZodError ? error.issues : [{ message: "Invalid request data" }];

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }
  };
