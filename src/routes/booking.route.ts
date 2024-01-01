import express from "express";
import { validate } from "../middleware/validate";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { restrictTo } from "../middleware/restrictTo";
import {
  createBookingHandler,
  findAllBookingsHandler,
  findBookingHandler,
  createPaymentIntentHandler,
  retrievePaymentIntentHandler
} from "../controllers/booking.controller";
import { createBookingSchema } from "../schema/booking.schema";

const router = express.Router();

router.use(deserializeUser, requireUser);

router.post("/", validate(createBookingSchema), createBookingHandler);
router.get("/:bookingId", findBookingHandler);
router.post("/:bookingId/payment",createPaymentIntentHandler)
router.post("/:bookingId/payment/retrieve",retrievePaymentIntentHandler)
router.get("/", restrictTo("admin"), findAllBookingsHandler);

export default router;
