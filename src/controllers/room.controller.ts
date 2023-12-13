import { NextFunction, Request, Response } from "express";
import {
  createRoom,
  findRoomById,
  addRoomToHotel,
  findAllRooms
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
export const findRoomController = async (
  req: Request<RoomParamsInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const room = await findRoomById(req.params.roomId);
    if (!room) {
      return res.status(404).json({
        status: "fail",
        message: "Room with that ID not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        room,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

// Get list of all rooms
export const findAllRoomsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rooms = await findAllRooms();
    res.status(200).json({
      status: "success",
      result: rooms.length,
      data: {
        rooms,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

// Update room

// Update room availablity

// Delete room
