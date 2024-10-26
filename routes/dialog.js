import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createDialog, getAll, getDialogMessages, getDialogByUserId } from '../controllers/dialogs.js';

const router = new Router();

// Создание нового диалога
router.post('/', checkAuth, createDialog);

// Получение всех диалогов
router.get('/', getAll);

// Получение сообщений диалога по ID
router.get('/messages/:id', async (req, res) => {
    try {
        const messages = await getDialogMessages(req.params.id);
        if (messages.status) {
            return res.status(messages.status).send({ message: messages.message });
        }
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Получение диалога по userId
router.get('/user/:userId', checkAuth, getDialogByUserId);

export default router;