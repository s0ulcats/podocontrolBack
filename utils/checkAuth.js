import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.id;
            next();
        } catch (error) {
            console.error('Token verification error:', error);
            return res.status(403).send({ message: 'No access' });
        }
    } else {
        console.warn('No token provided');
        return res.status(403).send({ message: 'No access' });
    }
};