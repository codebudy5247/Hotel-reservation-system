import express from "express";
import { validate } from "../middleware/validate";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { restrictTo } from "../middleware/restrictTo";
import {
  createBookingHandler,
  findAllBookingsHandler,
} from "../controllers/booking.controller";
import { createBookingSchema } from "../schema/booking.schema";

const router = express.Router();

router.use(deserializeUser, requireUser);

router.post("/", validate(createBookingSchema), createBookingHandler);
router.get("/", restrictTo("admin"), findAllBookingsHandler);

export default router;
