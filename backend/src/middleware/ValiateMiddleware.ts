import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

export const validateRequest =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      const requestData = parsed as {
        body?: Request["body"];
        params?: Request["params"];
      };

      if (requestData.body) req.body = requestData.body;
      if (requestData.params) req.params = requestData.params;

      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
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
