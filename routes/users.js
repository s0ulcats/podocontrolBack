import { Router } from 'express';
import { getAllUsers, getUserById, getUserPosts, updateUsersStatus } from '../controllers/users.js'; // Импортируем контроллер

const router = new Router();

router.get('/', getAllUsers); // Роут для получения всех пользователей
router.get('/:id', getUserById); // Роут для получения пользователя по ID
router.get('/:id/posts', getUserPosts); // Роут для получения постов конкретного пользователя
router.put('/:id', updateUsersStatus); // Новый роут для обновления статуса пользователя

export default router;