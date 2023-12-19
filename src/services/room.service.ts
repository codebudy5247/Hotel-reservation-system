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
export async function findAndUpdateRoom(roomId: string, update: any) {
  return roomModel.findByIdAndUpdate(roomId, update, { new: true });
}

// Delete Room
export async function deleteRoom(query: FilterQuery<Room>) {
  return roomModel.deleteOne(query);
}

/**
 * The function adds a new room to a hotel by updating the hotel document in the database.
 * @param {string} hotelId - The hotelId parameter is a string that represents the unique identifier of
 * the hotel to which the new room will be added.
 * @param newRoom - The `newRoom` parameter is the ID of the new room that you want to add to the
 * hotel. It should be of type `Types.ObjectId`, which is typically a unique identifier for documents
 * in a MongoDB database.
 * @returns the result of the `findOneAndUpdate` operation performed on the `hotelModel`.
 */
export async function addRoomToHotel(hotelId: string, newRoom: Types.ObjectId) {
  return hotelModel.findOneAndUpdate(
    { _id: hotelId },
    {
      $push: { rooms: newRoom },
    },
    { new: true }
  );
}
