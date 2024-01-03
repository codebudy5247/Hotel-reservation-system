import { NextFunction, Request, Response } from "express";
import { findAllUsers } from "../services/user.service";
import { findAllBooking } from "../services/booking.service";
// User Profile
export const getMeHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

// List of users
export const getAllUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findAllUsers();
    res.status(200).json({
      status: "success",
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

// List of user bookings
export const getAllUserBookingsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const bookings = await findAllBooking();
    let userBookings = bookings.filter(
      (booking) => booking.user === user._id.toString()
    );
    res.status(200).json({
      status: "success",
      data: {
        userBookings,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
