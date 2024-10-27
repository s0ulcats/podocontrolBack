import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createDialog, getAll, getDialogMessages, getDialogByUserId } from '../controllers/dialogs.js';

const router = new Router();

router.post('/', checkAuth, createDialog);

router.get('/', getAll);

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

router.get('/user/:userId', checkAuth, getDialogByUserId);

export default router;