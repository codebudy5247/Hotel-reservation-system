import { object, number, string, TypeOf } from "zod";

export const createRoomSchema = object({
  body: object({
    roomType: string({ required_error: "Room Type is required" }),
    maxPeople: number({ required_error: "Max people is required" }),
    price: number({ required_error: "Price is required" }),
    description: string({
      required_error: "Description should be at least 120 characters long ",
    }),
    roomNumbers: object({
      roomNumber: number({ required_error: "Room number is required" }),
    }).array(),
  }),
});

export const params = object({
  roomId: string(),
});

export const updateRoomSchema = object({
  params,
  body: object({
    roomNumber: string({ required_error: "Room Number is required" }),
    roomType: string({ required_error: "Room Type is required" }),
    maxPeople: number({ required_error: "Max people is required" }),
    price: number({ required_error: "Price is required" }),
    description: string({
      required_error: "Description should be at least 120 characters long ",
    }),
  }).partial(),
});

export type RoomParamsInput = TypeOf<typeof params>;
export type CreateRoomInput = TypeOf<typeof createRoomSchema>["body"];
export type UpdateRoomInput = TypeOf<typeof updateRoomSchema>;
