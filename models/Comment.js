import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
    {
        comment: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, // Добавляем привязку к посту
    },
    { timestamps: true }
);

export default mongoose.model('Comment', CommentSchema);
