import express from "express";
import { validate } from "../middleware/validate";
import {
  createRoomHandler,
  findRoomHandler,
  findAllRoomsHandler,
  updateRoomHandler,
  updateRoomAvailabilityHandler,
} from "../controllers/room.controller";
import { createRoomSchema, updateRoomSchema } from "../schema/room.schema";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { restrictTo } from "../middleware/restrictTo";

const router = express.Router();

router.get("/", findAllRoomsHandler);
router.get("/:roomId", findRoomHandler);

router.use(deserializeUser, requireUser);

router.put("/availability/:id", updateRoomAvailabilityHandler);

router.post(
  "/:hotelId",
  restrictTo("admin"),
  validate(createRoomSchema),
  createRoomHandler
);

router.put(
  "/:roomId",
  restrictTo("admin"),
  validate(updateRoomSchema),
  updateRoomHandler
);

export default router;
