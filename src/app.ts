import express from "express";
import { RegisterRoutes } from "./generated/routes";
import { ValidateError } from "tsoa";

export const app = express();

// read sent json payloads
app.use(express.json());

// standard type validation for tsoa
app.use(function errorHandler(
  err: unknown,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});

RegisterRoutes(app);

const port = process.env.PORT || 8000;

app.listen(port, () =>
  console.log(`Purchase app listening at http://localhost:${port}`)
);