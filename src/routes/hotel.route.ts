import express from "express";
import { validate } from "../middleware/validate";
import {
  createHotelHandler,
  findAllHotelsHandler,
} from "../controllers/hotel.controller";
import { createHotelSchema } from "../schema/hotel.schema";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { restrictTo } from "../middleware/restrictTo";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .route("/")
  .get(findAllHotelsHandler)
  .post(restrictTo("admin"), validate(createHotelSchema), createHotelHandler);

export default router;
