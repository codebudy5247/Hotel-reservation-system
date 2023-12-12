import { NextFunction, Request, Response } from "express";
import {
  createRoom,
  findRoomById,
  addRoomToHotel,
} from "../services/room.service";

import { CreateRoomInput, RoomParamsInput } from "../schema/room.schema";
import { HotelParamsInput } from "../schema/hotel.schema";

// Create Room
export const createRoomHandler = async (
  req: Request<HotelParamsInput, {}, CreateRoomInput>, //Params,Query,Body
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const room = await createRoom(body);

    await addRoomToHotel(req.params.hotelId, room._id);

    res.status(201).json({
      status: "success",
      data: {
        room,
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "Room already exist",
      });
    }
    next(err);
  }
};

// Find room by ID
