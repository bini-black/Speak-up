import express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const router = express.Router();

const privateKey = process.env.PRIVATE_KEY || fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf8');

// POST /api/auth/login — expects { code }
router.post('/login', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Missing auth code' });
  }

  try {
    // Generate client assertion JWT
    const clientAssertion = jwt.sign(
      {
        iss: process.env.FAYDA_CLIENT_ID,
        sub: process.env.FAYDA_CLIENT_ID,
        aud: process.env.FAYDA_TOKEN_ENDPOINT,
        jti: Math.random().toString(36).substring(2),
        exp: Math.floor(Date.now() / 1000) + 300,
      },
      privateKey,
      { algorithm: 'RS256' }
    );
    const logSchema = new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      action: String,
      ipAddress: String,
      userAgent: String,
      createdAt: { type: Date, default: Date.now }
    });
    
    const Log = mongoose.model('Log', logSchema);

    // Exchange code for access token
    const tokenResponse = await axios.post(
      process.env.FAYDA_TOKEN_ENDPOINT,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.FAYDA_REDIRECT_URI,
        client_id: process.env.FAYDA_CLIENT_ID,
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        client_assertion: clientAssertion,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Get user info
    const userInfoResponse = await axios.get(process.env.FAYDA_USERINFO_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.status(200).json({
      user: userInfoResponse.data,
      token: accessToken,
    });
  } catch (error) {
    console.error('VeriFayda auth error:', error?.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to authenticate with VeriFayda' });
  }
});

export default router;
