import { NextFunction, Request, Response } from "express";
import {
  createHotel,
  findHotelById,
  findAllHotels,
} from "../services/hotel.service";
import { CreateHotelInput, HotelParamsInput } from "../schema/hotel.schema";
import { findRoomById } from "../services/room.service";
import cloudinary from "cloudinary";

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
    res.status(200).json(hotel);
  } catch (err: any) {
    next(err);
  }
};

// Get hotel rooms
export const getHotelRooms = async (
  req: Request,
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
    const roomIds = hotel.rooms || [];

    const list = await Promise.all(
      roomIds.map((roomId) => {
        return findRoomById(roomId);
      })
    );
    res.status(200).json(list);
  } catch (err: any) {
    next(err);
  }
};

//test purpose
export const testHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const imageUrls = await uploadImages(imageFiles);
    res.send(imageUrls);
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}
