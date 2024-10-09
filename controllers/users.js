import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort('-createdAt'); // Получаем всех пользователей, сортируем по дате создания
        if (!users.length) { // Проверяем, если нет пользователей
            return res.status(404).json({ message: 'Users not exist' }); // Исправлено сообщение
        }
        res.json(users); // Отправляем пользователей
    } catch (error) {
        res.status(500).json({ message: 'Something is wrong' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user)
    } catch (error) {
        res.send({ message: 'Somethimg is wrong' })
    }
}

import Post from '../models/Post.js'; // Импортируй модель Post

export const getUserPosts = async (req, res) => {
    try {
        const userId = req.params.id; // Получаем ID пользователя из URL
        const posts = await Post.find({ author: userId }); // Ищем посты по автору
        if (!posts.length) {
            return res.status(404).json({ message: 'No posts found' });
        }
        res.json(posts); // Возвращаем найденные посты
    } catch (error) {
        res.status(500).json({ message: 'Something is wrong' });
    }
};

