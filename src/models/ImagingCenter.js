import mongoose from 'mongoose';

const imagingCenterSchema = new mongoose.Schema({
  name: String,
  phone: String,
  city: String,
  type: String,
  image: String,
});

export default mongoose.model('ImagingCenter', imagingCenterSchema);
