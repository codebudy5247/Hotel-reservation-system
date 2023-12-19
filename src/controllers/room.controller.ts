import { NextFunction, Request, Response } from "express";
import {
  createRoom,
  findRoomById,
  addRoomToHotel,
  findAllRooms,
  findAndUpdateRoom,
} from "../services/room.service";

import {
  CreateRoomInput,
  RoomParamsInput,
  UpdateRoomInput,
} from "../schema/room.schema";
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
export const findRoomHandler = async (
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
export async function updateRoomHandler(
  req: Request<UpdateRoomInput["params"], {}, UpdateRoomInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { roomNumber, roomType, maxPeople, price, description } = req.body;

    const roomId = req.params.roomId;

    const updatedRoom = await findAndUpdateRoom(roomId, {
      roomNumber,
      roomType,
      maxPeople,
      price,
      description,
    });
    if (!updatedRoom) {
      return res.status(404).json({
        status: "fail",
        message: "Room with that ID not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        updatedRoom,
      },
    });
  } catch (err: any) {
    next(err);
  }
}

// Update room availablity

// Delete room
