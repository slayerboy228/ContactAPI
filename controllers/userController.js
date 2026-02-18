const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// API - /api/user/signup
const signupHandler = async (req, res) => {
    const { name, email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
        return res.status(403).json({ 'message': 'user already exits', 'status': false });
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPwd });
    res.json({ message: 'user registration successfull', status: true, user: user });
}

// API - /api/user/login
const loginHandler = async (req, res) => {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
        return res.status(404).json({ message: 'user not found', status: false });
    }
    const validateUser = await bcrypt.compare(password, checkUser.password);
    if (validateUser) {
        const token = await jwt.sign({ userId: checkUser._id }, process.env.SECRET_KEY, {
            expiresIn: '1d'
        });
        return res.json({ message: 'user logged in!', token });
    }
    res.status(403).json({ 'message': 'password is incorrect', status: false });
}

module.exports = { signupHandler, loginHandler };