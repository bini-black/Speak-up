import express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Load private key for JWT client assertion (either from env or file)
const privateKey = process.env.PRIVATE_KEY || fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf8');

// POST /api/auth/login — expects { code } from VeriFayda OAuth redirect
router.post('/login', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Missing auth code' });
  }

  try {
    // Create JWT client assertion for VeriFayda token exchange
    const clientAssertion = jwt.sign(
      {
        iss: process.env.FAYDA_CLIENT_ID,
        sub: process.env.FAYDA_CLIENT_ID,
        aud: process.env.FAYDA_TOKEN_ENDPOINT,
        jti: Math.random().toString(36).substring(2),
        exp: Math.floor(Date.now() / 1000) + 300, // 5 minutes expiry
      },
      privateKey,
      { algorithm: 'RS256' }
    );

    // Exchange code for access token
    const tokenRes = await axios.post(
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
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const accessToken = tokenRes.data.access_token;

    // Fetch user info from VeriFayda
    const userInfoRes = await axios.get(process.env.FAYDA_USERINFO_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // Here, you can find or create user in your DB based on userInfoRes.data
    // For demo, just return user info & token to frontend

    res.json({ user: userInfoRes.data, token: accessToken });
  } catch (error) {
    console.error('VeriFayda auth error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to authenticate with VeriFayda' });
  }
});

export default router;
