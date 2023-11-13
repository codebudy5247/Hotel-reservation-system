import { FilterQuery, QueryOptions } from "mongoose";
import hotelModel, { Hotel } from "../models/hotel.model";

// Create hotel
export async function createHotel(input: Hotel) {
  try {
    const result = await hotelModel.create(input);
    return result;
  } catch (error) {
    throw error;
  }
}

// Find Hotel by Id
export const findHotelById = async (id: string) => {
  const hotel = await hotelModel.findById(id).lean();
  return hotel;
};

// Find list of all hotels
export const findAllHotels = async () => {
  return await hotelModel.find();
};

// Find hotel by an field
export const findHotel = async (
  query: FilterQuery<Hotel>,
  options: QueryOptions = {}
) => {
  return await hotelModel.findOne(query, {}, options);
};
