import Message from '../models/Message.js';
import User from '../models/User.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const createMessage = async (req, res) => {
    try {
        const { message, dialogId } = req.body;
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const fileName = req.files ? Date.now().toString() + req.files.image.name : '';

        if (fileName) {
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));
        }

        const newMessage = new Message({
            message,
            phone: user.phone,
            author: userId,
            imgUrl: fileName || '',
            dialogId,
        });

        await newMessage.save();

        res.status(201).send(newMessage);
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).send({ message: 'Something went wrong while creating message' });
    }
};

export const getMessagesByDialogId = async (req, res) => {
    try {
        const { id } = req.params;

        const messages = await Message.find({ dialogId: id }).populate('author');

        if (!messages.length) {
            console.warn('No messages found for dialogId:', id);
            return res.status(404).send({ message: 'Messages not found' });
        }

        res.status(200).send(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send({ message: 'Server error' });
    }
};