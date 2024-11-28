import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        message: { type: String, required: true },
        phone: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        imgUrl: { type: String, default: '' },
        dialogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dialog', required: true },
    },
    { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
