import bookingModel, { Booking } from "../models/booking.model";

// Create Booking
export async function createBooking(input: Booking) {
  try {
    const result = await bookingModel.create(input);
    return result;
  } catch (error) {
    throw error;
  }
}

// Find Room by Id
export const findBookingById = async (id: string) => {
  const booking = await bookingModel.findById(id).lean();
  return booking;
};

// Find list of all Rooms
export const findAllBooking = async () => {
  return await bookingModel.find();
};
