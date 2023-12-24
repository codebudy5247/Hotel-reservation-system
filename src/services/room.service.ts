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

// Add rooms to hotel
export async function addRoomToHotel(hotelId: string, newRoom: Types.ObjectId) {
  return hotelModel.findOneAndUpdate(
    { _id: hotelId },
    {
      $push: { rooms: newRoom },
    },
    { new: true }
  );
}

// Update the room availability
export async function updateRoomAvailability(
  roomId: string,
  unavailableDates: Date[]
) {
   return roomModel.updateOne(
    { "roomNumbers._id": roomId },
    {
      $push: {
        "roomNumbers.$.unavailableDates": unavailableDates
      },
    }
  )
}