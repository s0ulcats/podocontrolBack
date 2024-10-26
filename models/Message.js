import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dialogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dialog', required: true }, // Обязательно
}, { timestamps: true });

export default mongoose.model('Message', messageSchema);