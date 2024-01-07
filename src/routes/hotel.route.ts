import express from "express";
import { validate } from "../middleware/validate";
import {
  createHotelHandler,
  findAllHotelsHandler,
  findHotelController,
  getHotelRooms,
  testHandler
} from "../controllers/hotel.controller";
import { createHotelSchema } from "../schema/hotel.schema";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { restrictTo } from "../middleware/restrictTo";
import { uploadHotelImages } from "../upload/multi-upload";
const router = express.Router();

router.get('/',findAllHotelsHandler)
router.get('/:hotelId',findHotelController)
router.get('/rooms/:hotelId',getHotelRooms)

router.post('/test-upload',uploadHotelImages,testHandler)

router.use(deserializeUser, requireUser);

router.post('/',restrictTo("admin"), validate(createHotelSchema), createHotelHandler)


export default router;
