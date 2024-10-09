import mongoose from 'mongoose';

const DialogSchema = new mongoose.Schema(
    {
        message: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

export default mongoose.model('Dialog', DialogSchema);

