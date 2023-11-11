import { object, string, TypeOf,number } from 'zod';

export const createHotelSchema = object({
    body: object({
      name: string({ required_error: 'Name is required' }),
      location: object({
        state: string(),
        city: string(),
        zip: string(),
        street: string(),
      }),
      description: string({ required_error: 'Description is required' }),
      rating: number(),
    }),
  });