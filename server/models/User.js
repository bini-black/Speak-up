import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  faydaId: { type: String, unique: true },
  name: String,
  email: String,
  role: {
    type: String,
    enum: ['user', 'psychiatrist', 'admin'],
    default: 'user'
  },
  isCertified: { type: Boolean, default: false },
  rating: { type: Number, default: 0 }
});

export default mongoose.model('User', userSchema);
