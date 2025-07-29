import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get all users (for admin only)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '-username'); // Hide usernames
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;
