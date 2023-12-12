import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

enum RoomType {
  basic = "basic",
  luxury = "luxury",
  suite = "suite",
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Room {
  @prop({ required: true, unique: true })
  roomNumber: string;

  @prop({ type: () => String, enum: Object.values(RoomType) })
  roomType: string;

  @prop({ required: true })
  maxPeople: number;

  @prop({ required: true })
  price: number;

  @prop({ required: true })
  description?: string;
}

const roomModel = getModelForClass(Room);
export default roomModel;
