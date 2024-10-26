import User from '../models/User.js';
import Post from '../models/Post.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort('-createdAt'); // Получаем всех пользователей, сортируем по дате создания
        if (!users.length) { // Проверяем, если нет пользователей
            return res.status(404).json({ message: 'Users not exist' }); // Исправлено сообщение
        }
        res.json(users); // Отправляем пользователей
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Something is wrong' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.send({ message: 'Something is wrong' });
    }
}


export const getUserPosts = async (req, res) => {
    try {
        const userId = req.params.id; // Получаем ID пользователя из URL
        const posts = await Post.find({ author: userId }); // Ищем посты по автору
        if (!posts.length) {
            return res.status(404).json({ message: 'No posts found' });
        }
        res.json(posts); // Возвращаем найденные посты
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ message: 'Something is wrong' });
    }
};

// controllers/users.js
export const updateUsersStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Обновляем статус
        user.status = req.body.status || 'Статус';
        await user.save();
        
        res.json(user); // Возвращаем обновленного пользователя
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
