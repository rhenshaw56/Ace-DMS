// Import the mongoose module
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, {
  useMongoClient: true
});

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'MongoDB connection error:')); // eslint-disable-line
connection.once('open', () => {
  console.log("CONNECTED TO MONGODB"); // eslint-disable-line
});

connection.on('close', () => {
  console.info('MongoDB connection closed'); // eslint-disable-line
  process.exit(0);
});

export default mongoose;
