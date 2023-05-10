const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const pool = require('../../config/db.config');
const userModel = require('../models/appuserslogin.model');
const keys = require('../../config/key.config');

// login
exports.appuserslogin = function(req, res) {
    const { email, password, sex} = req.body;
    try {
        userModel.getUserByEmail(email, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error111111' });
        }
    
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        console.log(user)
    
        // if (user.Status !== 'active') {
        //     return res.status(400).json({ error: 'Invalidd request' });
        // }
    
        // bcrypt.compare(password, user.password, (err, result) => {
        //     if (err) {
        //     return res.status(500).json({ error: 'Internal server error' });
        //     }
    
        //     if (!result) {
        //     return res.status(401).json({ error: 'Invalid credentials' });
        //     }
    
        //     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        //     return res.json({ token });
        // });
        message = 'successful login'
        error = false
        userId = user.id
        // status = ''
        const token = jwt.sign({ userId: user.id, userPassword: user.email }, keys.JWT_SECRET);
            return res.json({ token, email, message, error, userId });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}