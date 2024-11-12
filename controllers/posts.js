import Post from '../models/Post.js';
import User from '../models/User.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const createPost = async (req, res) => {
    try {
        const { title, text } = req.body;
        const user = await User.findById(req.userId);

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

            const newPostWithImage = new Post({
                phone: user.phone,
                user: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId,
            });

            await newPostWithImage.save();
            user.posts.push(newPostWithImage._id);
            await user.save();

            return res.send(newPostWithImage);
        }

        const newPostWithoutImage = new Post({
            phone: user.phone,
            user: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId,
        });

        await newPostWithoutImage.save();
        user.posts.push(newPostWithoutImage._id);
        await user.save();

        res.send(newPostWithoutImage);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong' });
    }
};

export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt');
        if (!posts) {
            return res.send({ message: 'Posts not exist' });
        }

        res.send({ posts });
    } catch (error) {
        res.send({ message: 'Somethimg is wrong' });
    }
};

export const getById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });
        res.send(post);
    } catch (error) {
        res.send({ message: 'Somethimg is wrong' });
    }
};

export const removePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.send({ message: 'Post not exist' });

        await User.findByIdAndUpdate(req.userId, {
            $pull: { posts: req.params.id },
        });

        res.send({ message: 'post was delete' });
    } catch (error) {
        res.send({ message: 'Somethimg is wrong' });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { title, text, id } = req.body;
        const post = await Post.findById(id);
        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));
            post.imgUrl = fileName || '';
        }

        post.title = title;
        post.text = text;

        await post.save();
        
        res.send(post);
    } catch (error) {
        res.send({ message: 'Somethimg is wrong' });
    }
};
