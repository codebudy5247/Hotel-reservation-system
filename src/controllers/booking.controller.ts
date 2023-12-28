import { NextFunction, Request, Response } from "express";
import { createBooking, findAllBooking } from "../services/booking.service";
import { CreateBookingInput } from "../schema/booking.schema";

// Create a new booking
export const createBookingHandler = async (
  req: Request<{}, {}, CreateBookingInput & { userId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const user = res.locals.user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const bookingData: CreateBookingInput & { user: string } = {
      ...body,
      user: user._id,
    };

    const booking = await createBooking(bookingData);

    res.status(201).json({
      status: "success",
      data: {
        booking,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

// Get list of all bookings
export const findAllBookingsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings = await findAllBooking();
    res.status(200).json({
      status: "success",
      result: bookings.length,
      data: {
        bookings,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
