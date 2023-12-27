import { object, number, string, TypeOf, date } from "zod";

export const createBookingSchema = object({
  body: object({
    checkIn: string({ required_error: "CheckIn Date is required" }),
    checkOut: string({ required_error: "CheckOut Date is required" }),
    totalAmount: number({ required_error: "Price is required" }),
    hotel: string({
      required_error: "Price is required ",
    }),
    user: string({
      required_error: "User is required",
    }),
    selectedRoomType: string({
      required_error: "Room Type is required",
    }),
  }),
});

export type CreateBookingInput = TypeOf<typeof createBookingSchema>["body"];
