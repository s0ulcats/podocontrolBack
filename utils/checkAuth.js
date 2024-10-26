import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    // Извлекаем токен и логируем его
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    console.log('Received token:', token);

    if (token) {
        try {
            // Проверка токена
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.id; // Устанавливаем userId из токена
            console.log('Decoded user ID:', req.userId); // Логируем userId
            next(); // Продолжаем выполнение запроса
        } catch (error) {
            console.error('Token verification error:', error); // Логируем ошибку
            return res.status(403).send({ message: 'No access' });
        }
    } else {
        console.warn('No token provided'); // Логируем отсутствие токена
        return res.status(403).send({ message: 'No access' });
    }
};
