import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Room } from "./room.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Hotel {
  @prop({ required: true, unique: true })
  name: string;

  @prop({ required: true, unique: true })
  location?: {
    state?: string;
    city?: string;
    zip?: string;
    street?: string;
  };

  @prop({required:true})
  description?: string;

  @prop({ default: 0 })
  rating?: number;

  // @prop({ ref: () => Room })
  // rooms?: Ref<Room>[];
}

const hotelModel = getModelForClass(Hotel);
export default hotelModel;
