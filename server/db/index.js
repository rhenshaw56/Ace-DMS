// Import the mongoose module
import mongoose from 'mongoose';

const db = {};

db.connect = (MONGOURI) => {
  mongoose.connect(MONGOURI, {
    useMongoClient: true
  });
  const dB = mongoose.connection;

  dB.on('error', console.error.bind(console, 'MongoDB connection error:')); // eslint-disable-line
  db.once('open', () => {
    console.log("CONNECTED TO MONGODB"); // eslint-disable-line
  });
};

// Set up default mongoose connection
// const mongoDB = 'mongodb://127.0.0.1/ace_dms';

// mongoose.connect(mongoDB, {
//   useMongoClient: true
// });

// Get the default connection
// const db = mongoose.connection;

// // Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:')); // eslint-disable-line

export default db;
