import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const isUsed = await User.findOne({ username });

        if (isUsed) {
            return res.status(402).send({ message: 'This username is busy' });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hash,
            status: 'active',
        });

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        await newUser.save();

        return res.send({
            newUser,
            token,
            message: "Register is successfuly",
        });

    } catch (error) {
        res.status(500).send({ message: "Err with create user" });
        console.log(error);
    }
};


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.send({ message: "User doesn't exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.send({ message: 'Incorrect password' });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        return res.send({
            token,
            user,
            message: "You enter to the system"
        });
    } catch (error) {
        res.status(500).send({ message: "Err with authorization" });
        console.log(error);
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.send({ message: "User doesn't exist" });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        return res.send({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: "Not access"});
    }
}
