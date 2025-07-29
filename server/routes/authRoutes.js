import express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from 'fs';
import User from '../models/User.js';
import Psychiatrist from '../models/Psychiatrist.js';

dotenv.config();

const router = express.Router();
const privateKey = process.env.PRIVATE_KEY || fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf8');

router.post('/login', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Missing auth code' });

  try {
    const clientAssertion = jwt.sign(
      {
        iss: process.env.CLIENT_ID,
        sub: process.env.CLIENT_ID,
        aud: process.env.TOKEN_ENDPOINT,
        jti: Math.random().toString(36).substring(2),
        exp: Math.floor(Date.now() / 1000) + 300,
      },
      privateKey,
      { algorithm: process.env.ALGORITHM || 'RS256' }
    );

    const tokenRes = await axios.post(
      process.env.TOKEN_ENDPOINT,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_assertion_type: process.env.CLIENT_ASSERTION_TYPE,
        client_assertion: clientAssertion,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const accessToken = tokenRes.data.access_token;

    const userInfoRes = await axios.get(process.env.USERINFO_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const faydaUser = userInfoRes.data;
    let user = await User.findOne({ faydaId: faydaUser.sub });
    let isPsychiatrist = false;

    if (!user) {
      user = await Psychiatrist.findOne({ faydaId: faydaUser.sub });
      if (user) isPsychiatrist = true;
    }

    if (!user) {
      user = await User.create({
        faydaId: faydaUser.sub,
        name: faydaUser.name || '',
        email: faydaUser.email || '',
        role: 'user',
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: isPsychiatrist ? 'psychiatrist' : user.role || 'user',
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name || '',
        email: user.email || '',
        role: user.role,
      },
    });
  } catch (error) {
    console.error('VeriFayda Auth Error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to authenticate with VeriFayda' });
  }
});

export default router;
