import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
  Ref,
} from "@typegoose/typegoose";

//Location {Sub document}
class Location {
  @prop({ type: () => String })
  state: string;

  @prop({ type: () => String })
  city: string;

  @prop({ type: () => String })
  zip: string;

  @prop({ type: () => String })
  street: string;

  @prop({ type: () => String })
  country: string;
}

enum Amenities {
  wifi = "wifi",
  kitchen = "kitchen",
  ac = "ac",
  tv = "tv",
  geyser = "geyser",
  powerBackup = "powerBackup",
  elevator = "elevator",
  security = "security",
  laundry="laundry",
  freeParking="freeParking",
  gym="gym",
  evCharger="evCharger"
}


@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Hotel {
  @prop({ required: true, unique: true })
  name: string;

  @prop({ type: () => Location })
  location: Location;
  
  @prop({ required: true })
  price:string

  @prop({ required: true,type: () => String}) 
  images: string[];

  @prop({ required: true })
  description?: string;

  @prop({ default: 0 })
  rating?: number;

  @prop({ type: () => String, enum: Object.values(Amenities) })
  amenities:string[]

  @prop({ required: true,type: () => String}) 
  policies:string[]

  // @prop({ required: true}) 
  // reviews:string

  // @prop({ ref: () => Room })
  // rooms?: Ref<Room>[];
}

const hotelModel = getModelForClass(Hotel);
export default hotelModel;
