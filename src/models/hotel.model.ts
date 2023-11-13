import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
  Ref,
} from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Hotel {
  @prop({ required: true, unique: true })
  name: string;

  @prop({ required: true, unique: true })
  location: {
    state: string;
    city: string;
    zip: string;
    street: string;
    country:string
  };
  
  @prop({ required: true })
  price:string

  @prop({ required: true })
  yearOpened:string

  @prop({ required: true}) 
  images: string[];

  @prop({ required: true })
  description?: string;

  @prop({ default: 0 })
  rating?: number;

  @prop({ required: true}) 
  amenities:string[]

  @prop({ required: true}) 
  policies:string[]

  // @prop({ required: true}) 
  // reviews:string

  // @prop({ ref: () => Room })
  // rooms?: Ref<Room>[];
}

const hotelModel = getModelForClass(Hotel);
export default hotelModel;
