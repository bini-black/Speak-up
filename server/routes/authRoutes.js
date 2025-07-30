import express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Psychiatrist from '../models/Psychiatrist.js';

dotenv.config();

const router = express.Router();

const generateClientAssertion = () => {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) throw new Error('PRIVATE_KEY is required');

  return jwt.sign(
    {
      iss: process.env.CLIENT_ID,
      sub: process.env.CLIENT_ID,
      aud: process.env.TOKEN_ENDPOINT,
      jti: Math.random().toString(36).substring(2),
      exp: Math.floor(Date.now() / 1000) + 300,
    },
    privateKey,
    {
      algorithm: 'RS256',
      header: { kid: process.env.KEY_ID }
    }
  );
};

router.post('/login', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ 
      error: 'Authorization code is required',
      error_code: 'MISSING_AUTHORIZATION_CODE'
    });
  }

  try {
    // 1. Exchange code for access token
    const clientAssertion = generateClientAssertion();
    const tokenParams = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.REDIRECT_URI,
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion: clientAssertion,
    });

    const tokenResponse = await axios.post(
      process.env.TOKEN_ENDPOINT,
      tokenParams,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        timeout: 10000
      }
    );

    const { access_token } = tokenResponse.data;
    if (!access_token) throw new Error('No access token received');

    // 2. Get user info from Fayda
    const userInfoResponse = await axios.get(process.env.USERINFO_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
      timeout: 10000
    });

    const faydaUser = userInfoResponse.data;
    if (!faydaUser.sub) throw new Error('Invalid user info response');

    // 3. Find or create user
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

    // 4. Create application JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: isPsychiatrist ? 'psychiatrist' : user.role,
        faydaId: faydaUser.sub
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 5. Return success response
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name || faydaUser.name || '',
        email: user.email || faydaUser.email || '',
        role: isPsychiatrist ? 'psychiatrist' : user.role,
      }
    });

  } catch (error) {
    console.error('Authentication error:', error.message);
    
    const status = error.response?.status || 500;
    const message = error.response?.data?.error || 'Authentication failed';
    
    res.status(status).json({ 
      success: false,
      error: message,
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
});

export default router;