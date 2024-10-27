import { Router } from 'express';
import { getAllUsers, getUserById, getUserPosts, updateUsersStatus } from '../controllers/users.js'; // Импортируем контроллер

const router = new Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/:id/posts', getUserPosts);
router.put('/:id', updateUsersStatus);

export default router;