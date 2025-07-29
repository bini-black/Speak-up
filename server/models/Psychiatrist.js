import mongoose from 'mongoose';

const psychiatristSchema = new mongoose.Schema({
  // Basic info (only admin sees full details)
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  // Role is always "psychiatrist"
  role: {
    type: String,
    default: 'psychiatrist',
    enum: ['psychiatrist'],
  },

  // Additional psychiatrist-specific info
  specialization: {
    type: String,
    default: '',
  },

  // Optional: years of experience, qualifications etc.
  yearsOfExperience: {
    type: Number,
    default: 0,
  },

  // For account status (active, inactive, banned)
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive', 'banned'],
  },

  // Date fields
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` on document save
psychiatristSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Psychiatrist = mongoose.model('Psychiatrist', psychiatristSchema);

export default Psychiatrist;
