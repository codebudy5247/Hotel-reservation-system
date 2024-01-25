require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import swaggerDocs from "./utils/swagger";
import cookieParser from "cookie-parser";
import connectDB from "./utils/connectDB";
import testRouter from "./routes/test.route"
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import hotelRouter from "./routes/hotel.route";
import roomRouter from "./routes/room.route"
import bookingRouter from "./routes/booking.route"

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT!
// Middleware

// Body Parser
app.use(express.json({ limit: "10kb" }));

// Cookie Parser
app.use(cookieParser());

// Cors
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// Logger
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Routes
app.use("/api/healthChecker",testRouter)
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/room", roomRouter);
app.use("/api/booking", bookingRouter);


// Swagger Documentation
swaggerDocs(app, port);

// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  // connectDB();
});
