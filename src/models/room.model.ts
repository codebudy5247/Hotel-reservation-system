import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

enum RoomType {
  basic = "basic",
  luxury = "luxury",
  suite = "suite",
}

//Location {Sub document}
class RoomNumbers {
  @prop({ type: () => Number })
  roomNumber: number;

  @prop({ required: true, type: () => Date })
  unavailableDates?: Date[];
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Room {
  @prop({ type: () => String, enum: Object.values(RoomType) })
  roomType: string;

  @prop({ required: true })
  maxPeople: number;

  @prop({ required: true })
  price: number;

  @prop({ required: true })
  description?: string;

  @prop({ type: () => RoomNumbers })
  roomNumbers: Array<RoomNumbers>;
}

const roomModel = getModelForClass(Room);
export default roomModel;
