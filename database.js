import mongoose from "mongoose";

const uri =
"mongodb+srv://yael90669:tinyURL@tinyurl.1ifsyas.mongodb.net/tinyURL?retryWrites=true&w=majority";
const uriLocal = "mongodb://localhost:27017/tinyURL";

mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
      delete converted._id;
    }
  });

const connectDB = async () => {
  await mongoose.connect(uri);
};

const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
})

database.once('connected', () => {
  console.log('Database Connected');
})

export default connectDB;
