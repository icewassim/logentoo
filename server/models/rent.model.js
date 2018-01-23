import mongoose from 'mongoose';

const rentModel = new mongoose.Schema({
  articles: {
    title: String,
    imgSrc: String,
    link: String,
    price : Number,
    city : String,
    zipCode: Number,
    rooms : Number,
    surface : Number,
    isPro: Number,
    isPerso: Number,
  },
  status: {
    enum: ['pending', 'complete', 'overdue']
  },
}, { minimize: false });

const rentRepo = mongoose.model('article', rentModel);

export default rentRepo;
