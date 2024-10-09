import { Router } from 'express';
import { getAllUsers, getUserById, getUserPosts } from '../controllers/users.js';

const router = new Router();

router.get('/', getAllUsers); // Роут для получения всех пользователей
router.get('/:id', getUserById)
router.get('/:id/posts', getUserPosts); // Новый роут для получения постов конкретного пользователя


export default router;
