import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createMessage, getMessagesByDialogId } from '../controllers/messages.js';

const router = new Router();

router.post('/:id', checkAuth, createMessage); // Временно уберите checkAuth
router.get('/:id', getMessagesByDialogId); // Временно уберите checkAuth

export default router;