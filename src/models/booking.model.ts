import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

class Payment {
  @prop({ type: () => String })
  paymentIntentId: string;

  @prop({ type: () => String })
  clientSecret: string;

  @prop({ type: () => Boolean })
  paymentStatus: boolean;
}

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

  @prop({ type: () => Payment })
  payment: Payment;
}

const bookingModel = getModelForClass(Booking);
export default bookingModel;
