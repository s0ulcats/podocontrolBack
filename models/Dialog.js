import mongoose from 'mongoose';

const DialogSchema = new mongoose.Schema(
    {
        username: { type: String }, // Имя диалога или пользователя
        messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], // Привязанные сообщения
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Автор диалога
    },
    { timestamps: true }
);

export default mongoose.model('Dialog', DialogSchema);