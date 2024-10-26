import Message from '../models/Message.js';

export const createMessage = async (req, res) => {
    try {
        const { message, dialogId } = req.body; // Получаем message и dialogId

        // Проверка на наличие dialogId и message
        if (!dialogId || !message) {
            console.error('dialogId or message is missing');
            return res.status(400).send({ message: 'dialogId and message are required' });
        }

        const userId = req.userId; // Получаем ID пользователя из токена

        // Создаем новое сообщение
        const newMessage = new Message({ message, author: userId, dialogId });
        await newMessage.save(); // Сохраняем сообщение

        return res.status(201).send(newMessage); // Возвращаем созданное сообщение
    } catch (error) {
        console.error('Error creating message:', error);
        return res.status(500).send({ message: 'Something went wrong while creating message' });
    }
};


export const getMessagesByDialogId = async (req, res) => {
    try {
        const { id } = req.params; // Получаем dialogId из параметров
        console.log('Received dialogId:', id);
        
        const messages = await Message.find({ dialogId: id }).populate('author'); // Ищем сообщения по dialogId

        if (!messages.length) {
            console.warn('No messages found for dialogId:', id);
            return res.status(404).send({ message: 'Messages not found' });
        }

        res.status(200).send(messages); // Возвращаем найденные сообщения
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send({ message: 'Server error' });
    }
};
