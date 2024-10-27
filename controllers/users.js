import User from '../models/User.js';
import Post from '../models/Post.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort('-createdAt');
        if (!users.length) {
            return res.status(404).json({ message: 'Users not exist' });
        }
        res.json(users);
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
};

export const getUserPosts = async (req, res) => {
    try {
        const userId = req.params.id;
        const posts = await Post.find({ author: userId });
        if (!posts.length) {
            return res.status(404).json({ message: 'No posts found' });
        }
        res.json(posts);
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ message: 'Something is wrong' });
    }
};

export const updateUsersStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.status = req.body.status || 'Статус';
        await user.save();
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
