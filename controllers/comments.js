import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const userId = req.userId;

        if (!comment) {
            return res.status(400).send({ message: 'Comment cannot be empty' });
        }

        const newComment = new Comment({ comment, author: userId, postId });
        await newComment.save();

        try {
            await Post.findByIdAndUpdate(postId, {
                $push: { comments: newComment._id },
            });
        } catch (error) {
            console.log('Error updating post with new comment:', error);
            return res.status(500).send({ message: 'Failed to update post with comment' });
        }

        return res.status(201).send(newComment);
    } catch (error) {
        console.log('Error creating comment:', error);
        return res.status(500).send({ message: 'Something went wrong while creating comment' });
    }
};
