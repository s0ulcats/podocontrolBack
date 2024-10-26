import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const userId = req.userId; // Получаем ID пользователя

        if (!comment) {
            return res.status(400).send({ message: 'Comment cannot be empty' });
        }

        const newComment = new Comment({ comment, author: userId, postId }); // Создаем комментарий с привязкой к посту и автору
        await newComment.save();

        try {
            await Post.findByIdAndUpdate(postId, {
                $push: { comments: newComment._id }, // Обновляем пост, добавляя ID комментария
            });
        } catch (error) {
            console.log('Error updating post with new comment:', error);
            return res.status(500).send({ message: 'Failed to update post with comment' });
        }

        return res.status(201).send(newComment); // Отправляем созданный комментарий
    } catch (error) {
        console.log('Error creating comment:', error);
        return res.status(500).send({ message: 'Something went wrong while creating comment' });
    }
};
