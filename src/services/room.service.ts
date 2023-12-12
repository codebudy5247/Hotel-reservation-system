import { FilterQuery, QueryOptions, UpdateQuery, Types } from "mongoose";
import roomModel, { Room } from "../models/room.model";
import hotelModel from "../models/hotel.model";

// Create Room
export async function createRoom(input: Room) {
  try {
    const result = await roomModel.create(input);
    return result;
  } catch (error) {
    throw error;
  }
}

// Find Room by Id
export const findRoomById = async (id: string) => {
  const hotel = await roomModel.findById(id).lean();
  return hotel;
};

// Find list of all Rooms
export const findAllRooms = async () => {
  return await roomModel.find();
};

// Update Room
export async function findAndUpdateRoom(
  query: FilterQuery<Room>,
  update: UpdateQuery<Room>,
  options: QueryOptions
) {
  return roomModel.findOneAndUpdate(query, update, options);
}

// Delete Room
export async function deleteRoom(query: FilterQuery<Room>) {
  return roomModel.deleteOne(query);
}

// Add Room to hotel
export async function addRoomToHotel(hotelId: string, newRoom: Types.ObjectId) {
  return hotelModel.findOneAndUpdate(
    { _id: hotelId },
    {
      $push: { rooms: newRoom },
    },
    { new: true }
  );
}
