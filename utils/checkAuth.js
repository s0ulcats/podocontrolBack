import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decoded.id
            next()
        } catch (error) {
            console.log(error);  // Здесь ошибка уже определена в блоке catch
            return res.status(403).send({ message: "No access" });
        }
    } else {
        // Убрали console.log(error), так как переменная error не определена в блоке else
        return res.status(403).send({ message: "No access" });
    }
}
