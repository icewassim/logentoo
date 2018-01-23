import mongoose from 'mongoose';

const zipModel = new mongoose.Schema({
  _id: Number,
  zipCode: String,
}, { minimize: false });

const zipRepo = mongoose.model('zip', zipModel);
export default zipRepo;
