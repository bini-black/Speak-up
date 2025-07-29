import express from 'express';
import { getUsers, deleteUser } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get('/users', getUsers);
router.delete('/user/:id', deleteUser);

export default router;
