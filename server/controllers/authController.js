import axios from 'axios';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Psychiatrist from '../models/Psychiatrist.js';

export const handleFaydaLogin = async (req, res) => {
  const { code } = req.body;

  try {
    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    // Exchange code for token from Fayda OAuth server
    const tokenRes = await axios.post(
      process.env.TOKEN_ENDPOINT,
      {
        grant_type: 'authorization_code',
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const { access_token } = tokenRes.data;

    // Get user info from Fayda
    const userInfoRes = await axios.get(process.env.USERINFO_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const faydaUser = userInfoRes.data;

    // Try to find user in User collection
    let user = await User.findOne({ faydaId: faydaUser.sub });

    // If not found, try Psychiatrist collection
    let isPsychiatrist = false;
    if (!user) {
      user = await Psychiatrist.findOne({ faydaId: faydaUser.sub });
      if (user) isPsychiatrist = true;
    }

    // If still not found, create new user with role 'user'
    if (!user) {
      user = await User.create({
        faydaId: faydaUser.sub,
        name: faydaUser.name || '',
        email: faydaUser.email || '',
        role: 'user',
      });
    }

    // Create JWT token with id and role
    const token = jwt.sign(
      {
        id: user._id,
        role: isPsychiatrist ? 'psychiatrist' : user.role || 'user',
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name || user.fullName,
        email: user.email,
        role: isPsychiatrist ? 'psychiatrist' : user.role || 'user',
      },
      token,
    });
  } catch (err) {
    console.error('Login error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Authentication failed' });
  }
};
