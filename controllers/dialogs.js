import Dialog from '../models/Dialog.js';
import User from '../models/User.js';
import Message from '../models/Message.js';

export const createDialog = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            console.warn('User not found:', req.userId);
            return res.status(404).send({ message: 'User not found' });
        }

        const newDialog = new Dialog({
            phone: user.phone,
            username: user.username,
            author: req.userId,
        });

        await newDialog.save();
        user.dialogs.push(newDialog._id);
        await user.save();

        res.send(newDialog);
    } catch (error) {
        console.error('Error creating dialog:', error);
        res.status(500).send({ message: 'Something went wrong' });
    }
};

export const getAll = async (req, res) => {
    try {
        const dialogs = await Dialog.find().sort('-createdAt');
        if (!dialogs.length) {
            return res.status(404).send({ message: 'No dialogs found' });
        }

        res.send({ dialogs });
    } catch (error) {
        console.error('Error fetching dialogs:', error);
        res.status(500).send({ message: 'Something is wrong' });
    }
};

export const getDialogMessages = async (dialogId) => {
    try {
        if (!dialogId) {
            return { status: 400, message: 'Dialog ID is required' };
        }

        const messages = await Message.find({ dialogId });

        if (!messages || messages.length === 0) {
            return { status: 404, message: 'Messages not found' };
        }

        return messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return { status: 500, message: 'Server error', error: error.message };
    }
};

export const getDialogByUserId = async (req, res) => {
    try {
        const dialog = await Dialog.findOne({ author: req.params.userId });

        if (!dialog) {
            return res.status(404).send({ message: 'Dialog not found' });
        }

        res.status(200).send(dialog);
    } catch (error) {
        console.error('Error fetching dialog by user:', error);
        return res.status(500).send({ message: 'Failed to fetch dialog' });
    }
};