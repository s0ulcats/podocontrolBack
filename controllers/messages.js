import Message from '../models/Message.js';
import User from '../models/User.js'
export const createMessage = async (req, res) => {
    try {
        const { message, dialogId } = req.body;

        if (!dialogId || !message) {
            console.error('dialogId or message is missing');
            return res.status(400).send({ message: 'dialogId and message are required' });
        }

        const userId = req.userId;

        // Получаем информацию о пользователе по userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Теперь у нас есть номер телефона пользователя
        const phone = user.phone;

        // Создаем новое сообщение
        const newMessage = new Message({ message, phone, author: userId, dialogId });
        await newMessage.save();

        return res.status(201).send(newMessage);
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
