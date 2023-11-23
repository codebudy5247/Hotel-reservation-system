import { object, number, string, TypeOf } from "zod";

export const createHotelSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    location: object({
      state: string({ required_error: "State is required" }),
      city: string({ required_error: "City is required" }),
      zip: string({ required_error: "Zip is required" }),
      street: string({ required_error: "Street is required" }),
      country: string({ required_error: "Country is required" }),
    }),
    price: string({ required_error: "Name is required" }),
    images: string({ required_error: "Image is required" })
      .array()
      .min(1)
      .max(10),
    description: string({
      required_error: "Description should be at least 120 characters long ",
    }),
    amenities: string({ required_error: "Amenities is required" })
      .array()
      .min(3)
      .max(20),
    policies: string({ required_error: "Policies is required" })
      .array()
      .min(3)
      .max(20),
  }),
});

export const params = object({
  hotelId: string(),
});

export const updateHotelSchema = object({
  params,
  body: object({
    name: string({ required_error: "Name is required" }),
    location: object({
      state: string({ required_error: "State is required" }),
      city: string({ required_error: "City is required" }),
      zip: string({ required_error: "Zip is required" }),
      street: string({ required_error: "Street is required" }),
      country: string({ required_error: "Country is required" }),
    }),
    images: string({ required_error: "Image is required" }),
    description: string({
      required_error: "Description should be at least 120 characters long ",
    }),
  }).partial(),
});

export const filterQuery = object({
  limit: number().default(1),
  page: number().default(10),
});

export type ParamsInput = TypeOf<typeof params>;
export type FilterQueryInput = TypeOf<typeof filterQuery>;
export type CreateHotelInput = TypeOf<typeof createHotelSchema>["body"];
export type UpdateHotelInput = TypeOf<typeof updateHotelSchema>;
