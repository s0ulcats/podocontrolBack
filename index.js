import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';
import commentRoute from './routes/comment.js';
import dialogRoute from './routes/dialog.js';
import messageRoute from './routes/message.js';
import usersRoute from './routes/users.js';
import fileUpload from 'express-fileupload';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('uploads')); // Папка для статики

// Подключение маршрутов
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);
app.use('/api/dialogs', dialogRoute);
app.use('/api/messages', messageRoute);
app.use('/api/users', usersRoute); // Убедитесь, что этот маршрут подключен

// Проверка подключения к базе данных
async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.nmcxy.mongodb.net/${DB_NAME}`
        );
        console.log('Connected to DB');

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.log('DB connection error:', error);
        process.exit(1); // Прерываем запуск приложения при ошибке подключения
    }
}

start();