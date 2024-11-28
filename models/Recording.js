import mongoose from 'mongoose';

const recordingSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  procedure: { type: String, required: true },
});

const Recording = mongoose.model('Recording', recordingSchema);

export default Recording;