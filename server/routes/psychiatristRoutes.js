import express from 'express';
import Psychiatrist from '../models/Psychiatrist.js';

const router = express.Router();

// Get list of psychiatrists
router.get('/', async (req, res) => {
  try {
    const psychiatrists = await Psychiatrist.find({}, '-name'); // Hide name for non-admin
    res.json(psychiatrists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch psychiatrists' });
  }
});

export default router;
