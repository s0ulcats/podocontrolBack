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
                username: user.username,
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
            username: user.username,
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
        const popularPosts = await Post.find().limit(5).sort('-veiws');
        if (!posts) {
            return res.send({ message: 'Posts not exist' });
        }

        res.send({ posts, popularPosts });
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

export const getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const list = await Promise.all(
            user.posts.map(post => {
                return Post.findById(post._id);
            })
        );
        res.send(list);
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

export const getPostComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate({
            path: 'comments',
            populate: { path: 'author', select: 'username' }
        });

        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        res.status(200).send(post.comments);
    } catch (error) {
        console.log('Error fetching post comments:', error);
        return res.status(500).send({ message: 'Failed to fetch comments' });
    }
};
