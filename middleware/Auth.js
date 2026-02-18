const jwt = require('jsonwebtoken');
const User = require('../model/User');

const isAuthenticate = async (req, res, next) => {
    const token = req.headers['auth'];
    if (!token) {
        return res.json({
            message: 'Not Authorized, please login',
            status: false
        });
    }
    const decoded = jwt.verify(token, '$/@ABCD');
    const userId = decoded.userId;
    const findUser = await User.findOne({ _id: userId });
    if (!findUser) {
        return res.json({ message: 'user not found', status: false });
    }
    req.userData = findUser;
    next();
}

module.exports = { isAuthenticate };