import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  userId: {  // The user who gave the rating
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  targetUserId: {  // The user being rated (could be psychiatrist, etc)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  score: {  // e.g. 1 to 5 stars
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    maxlength: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
