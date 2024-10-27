import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createMessage, getMessagesByDialogId } from '../controllers/messages.js';

const router = new Router();

router.post('/:id', checkAuth, createMessage);
router.get('/:id', getMessagesByDialogId);

export default router;