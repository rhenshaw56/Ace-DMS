import mongoose from '../db';

const { Schema } = mongoose;

const DocumentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    unique: true,
  },
  access: {
    type: String,
    required: true,
    default: 'public'
  },
  ownerId: {
    type: String,
    required: true,
  }
});


const Documents = mongoose.model('Documents', DocumentSchema);

export default Documents;
