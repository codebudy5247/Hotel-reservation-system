import { NextFunction, Request, Response } from "express";
import {
  createBooking,
  findAllBooking,
  findBookingById,
} from "../services/booking.service";
import {
  CreateBookingInput,
  BookingParamsInput,
} from "../schema/booking.schema";
import { HotelParamsInput } from "../schema/hotel.schema";
import { findHotelById } from "../services/hotel.service";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

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

// Get booking by ID
export const findBookingHandler = async (
  req: Request<BookingParamsInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking = await findBookingById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({
        status: "fail",
        message: "Booking with that ID not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        booking,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

// Create a payment intent
export async function createPaymentIntentHandler(
  req: Request<HotelParamsInput>,
  res: Response,
  next: NextFunction
) {
  try {
    const { totalAmount } = req.body;
    const hotelId = req.params.hotelId;
    const user = res.locals.user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const hotel = await findHotelById(hotelId);
    if (!hotel) {
      return res.status(404).json({
        status: "fail",
        message: "Hotel with that ID not found",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Convert INR to paise
      currency: "inr",
      metadata: {
        hotelId,
        userId: user._id,
      },
    });

    if (!paymentIntent.client_secret) {
      return res
        .status(500)
        .json({ status: "fail", message: "Error creating payment intent" });
    }

    // console.log(paymentIntent);
    res.status(200).json({
      status: "success",
      data: {
        hotelId,
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret.toString(),
        totalAmount,
      },
    });
  } catch (err: any) {
    next(err);
  }
}

// Retrieve a payment intent
export async function retrievePaymentIntentHandler(
  req: Request<BookingParamsInput>,
  res: Response,
  next: NextFunction
) {
  try {
    const { paymentIntentId } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string
    );

    if (!paymentIntent) {
      return res.status(400).json({ message: "payment intent not found" });
    }

    if (paymentIntent.metadata.bookingId !== req.params.bookingId) {
      return res.status(400).json({ message: "payment intent mismatch" });
    }

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        message: `payment intent not succeeded`,
        Status: paymentIntent.status,
      });
    }

    // Update booking payment status
  } catch (err: any) {
    next(err);
  }
}
