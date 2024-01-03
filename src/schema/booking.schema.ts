import { object, number, string, TypeOf, boolean } from "zod";

export const createBookingSchema = object({
  body: object({
    checkIn: string({ required_error: "CheckIn Date is required" }),
    checkOut: string({ required_error: "CheckOut Date is required" }),
    totalAmount: number({ required_error: "Price is required" }),
    hotel: string({
      required_error: "Price is required ",
    }),
    selectedRoomType: string({
      required_error: "Room Type is required",
    }),
    payment: object({
      paymentIntentId: string({ required_error: "Payment Intent Id is required" }),
      clientSecret: string({ required_error: "Client Secret is required" }),
      paymentStatus: boolean({ required_error: "Payment Status is required" }),
    }),
  }),
});

export const params = object({
  bookingId: string(),
});


export type CreateBookingInput = TypeOf<typeof createBookingSchema>["body"];
export type BookingParamsInput = TypeOf<typeof params>;