import Message from '../models/Message.js';
import User from '../models/User.js'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const createMessage = async (req, res) => {
    try {
        const { message, dialogId } = req.body;
        const userId = req.userId;
        const user = await User.findById(userId);
        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

            const newMessageWithImg = new Message({
                message,
                phone: user.phone,
                author: userId,
                imgUrl: fileName,
                dialogId,
            });

            await newMessageWithImg.save();
            return res.send(newMessageWithImg);
        }

        const newMessageWithoutImg = new Message({
            message,
            phone: user.phone,
            author: userId,
            imgUrl: '',
            dialogId,
        });

        await newMessageWithoutImg.save();
        return res.send(newMessageWithoutImg);

    } catch (error) {
        console.error('Error creating message:', error);
        return res.status(500).send({ message: 'Something went wrong while creating message' });
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
