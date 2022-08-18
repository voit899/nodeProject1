const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
    const { password, email, confirmPassword, name } = req.body;
    if (!password || !email || !confirmPassword || !name) {
        res.status(400).json({
            status: 'fail',
            statusCode: 400,
            error: 'please enter name, email and password',
        });
        return;
    }

    const user = await User.create({ name, email, password, confirmPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
    });
    const flag = process.env.ENVIRONMENT === 'production';
    res.cookie('jwt', token, {
        expire: process.env.JWT_EXPIRATION,
        httpOnly: flag,
        secure: flag,
    });
    res.send(token);
});

module.exports = authRouter;