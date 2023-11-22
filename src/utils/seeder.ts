require("dotenv").config();
import hotelModel from "../models/hotel.model";
import { hotels } from "../data/hotels";
import connectDB from "./connectDB";

connectDB();

const importData = async () => {
  try {
    await hotelModel.deleteMany();
    const predefinedHotels = hotels.map((hotel) => {
      return { ...hotel };
    });

    await hotelModel.insertMany(predefinedHotels);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
  }
};
const destroyData = async () => {
  try {
    await hotelModel.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
