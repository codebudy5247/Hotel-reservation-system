import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Booking {
  @prop({ required: true })
  checkIn: string;

  @prop({ required: true })
  checkOut: string;

  @prop({ required: true })
  totalAmount: number;

  @prop({ required: true })
  hotel: string;

  @prop({ required: true })
  user: string;

  @prop({ required: true })
  selectedRoomType: string;

  @prop({ required: true, default: false })
  paymentStatus?: boolean;
}

const bookingModel = getModelForClass(Booking);
export default bookingModel;
