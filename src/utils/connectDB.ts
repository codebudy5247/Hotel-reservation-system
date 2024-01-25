import mongoose from 'mongoose';

// const dbUrl = `mongodb://${config.get('dbName')}:${config.get(
//   'dbPass'
// )}@localhost:6000/jwtAuth?authSource=admin`;

const dbUrl = process.env.DB_URL!

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://ashekhar5247:so79dEcwQUn4lSlu@cluster0.pfvuiyz.mongodb.net/?retryWrites=true&w=majority");
    console.log('Database connected...');
  } catch (error: any) {
    console.log("MongoDb error",error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
