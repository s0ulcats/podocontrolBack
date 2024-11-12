import mongoose from 'mongoose';

const DialogSchema = new mongoose.Schema(
    {
        phone: { type: String, required: true, unique: true},
        username: { type: String },
        messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

export default mongoose.model('Dialog', DialogSchema);