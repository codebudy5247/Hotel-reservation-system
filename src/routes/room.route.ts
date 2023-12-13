import express from "express";
import { validate } from "../middleware/validate";
import {
  createRoomHandler,
  findRoomController,
  findAllRoomsHandler,
} from "../controllers/room.controller";
import { createRoomSchema } from "../schema/room.schema";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { restrictTo } from "../middleware/restrictTo";

const router = express.Router();

router.get('/',findAllRoomsHandler)
router.get('/:roomId',findRoomController)

router.use(deserializeUser, requireUser);

router.post(
  "/:hotelId",
  restrictTo("admin"),
  validate(createRoomSchema),
  createRoomHandler
);

export default router;
