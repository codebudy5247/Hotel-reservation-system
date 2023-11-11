import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Room {
  @prop({ unique: true, required: true })
  roomNumber: string;

  
}

const roomModel = getModelForClass(Room);
export default roomModel;
