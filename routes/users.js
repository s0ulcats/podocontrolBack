import { Router } from 'express';
import { getAllUsers, getUserById, updateAccountData, } from '../controllers/users.js';

const router = new Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateAccountData);

export default router;