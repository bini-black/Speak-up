import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { privateKey } from '../utils/jwtKeys.js';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPsychiatrist = user.role === 'psychiatrist';

    const token = jwt.sign(
      {
        id: user._id,
        role: isPsychiatrist ? 'psychiatrist' : user.role || 'user',
      },
      privateKey,
      {
        algorithm: 'RS256',
        expiresIn: '1d',
        header: { kid: process.env.KEY_ID },
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Authentication error', error: error.message });
  }
};
