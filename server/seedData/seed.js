// backend/seedData/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import User from '../models/User.js';
import Psychiatrist from '../models/Psychiatrist.js';
import Message from '../models/Message.js';
import ChatRoom from '../models/ChatRoom.js';
import Log from '../models/Log.js';
import Rating from '../models/Rating.js';

dotenv.config();

const runSeedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Clear all collections
    await Promise.all([
      User.deleteMany(),
      Psychiatrist.deleteMany(),
      Message.deleteMany(),
      ChatRoom.deleteMany(),
      Log.deleteMany(),
      Rating.deleteMany()
    ]);

    // Insert sample users
    const users = await User.insertMany([
      {
        faydaId: 'FDW001',
        name: 'Firdews Seifu',
        email: 'firdews@example.com',
        password: '123456', // Make sure your model hashes this
        role: 'admin',
        isCertified: true,
        rating: 5
      },
      {
        faydaId: 'USR001',
        name: 'Binyam Meuz',
        email: 'binyam@example.com',
        password: '123456',
        role: 'user',
        isCertified: false,
        rating: 3.5
      }
    ]);

    // Insert psychiatrist
    const psychiatrists = await Psychiatrist.insertMany([
      {
        fullName: 'Dr. Dagimawit Belayine',
        email: 'dagimawit@example.com',
        password: '123456',
        specialization: 'Depression',
        yearsOfExperience: 5
      }
    ]);

    // Create chat room
    const room = await ChatRoom.create({
      name: 'General Room',
      members: [users[0]._id, users[1]._id]
    });

    // Create messages
    await Message.insertMany([
      {
        sender: users[0]._id,
        receiver: users[1]._id,
        content: 'Hello Binyam!',
        roomId: room._id
      },
      {
        sender: users[1]._id,
        receiver: users[0]._id,
        content: 'Hi Firdews!',
        roomId: room._id
      }
    ]);

    // Logs
    await Log.create({
      userId: users[0]._id,
      action: 'login',
      ipAddress: '127.0.0.1',
      userAgent: 'Chrome'
    });

    // Rating
    await Rating.create({
      userId: users[1]._id,
      targetUserId: users[0]._id,
      score: 5,
      comment: 'Very helpful!'
    });

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    mongoose.disconnect();
  }
};

export default runSeedData;
