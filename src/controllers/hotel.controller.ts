import { NextFunction, Request, Response } from "express";
import {
  createHotel,
  findHotelById,
  findAllHotels,
} from "../services/hotel.service";

import { CreateHotelInput,HotelParamsInput } from "../schema/hotel.schema";

// Create hotel
export const createHotelHandler = async (
  req: Request<{}, {}, CreateHotelInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const hotel = await createHotel(body);
    res.status(201).json({
      status: "success",
      data: {
        hotel,
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "Hotel already exist",
      });
    }
    next(err);
  }
};

// Get list of all hotels
export const findAllHotelsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotels = await findAllHotels();
    res.status(200).json({
      status: "success",
      result: hotels.length,
      data: {
        hotels,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

// Get hotel by ID
export const findHotelController = async (
  req: Request<HotelParamsInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotel = await findHotelById(req.params.hotelId);
    if (!hotel) {
      return res.status(404).json({
        status: "fail",
        message: "Hotel with that ID not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        hotel,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
