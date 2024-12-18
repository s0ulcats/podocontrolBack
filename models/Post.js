import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {   
        phone: { type: String, required: true},
        username: { type: String },
        title: { type: String, required: true },
        text: { type: String, required: true },
        imgUrl: { type: String, default: '' },
        views: { type: Number, default: 0 },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

export default mongoose.model('Post', PostSchema);