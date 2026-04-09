require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ResponseFormat } = require('../utils/ResponseFormat');

exports.getAllUsers = (req, res) => {
    const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Caroline' }];
    res.json(users);
};

exports.getUserById = (req, res) => {
    const userID = req.params.id;
    const user = { id: userID, name: 'Alice' };
    res.json(user);
};

exports.createUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username) {
        return res.json({ isError: true, message: 'username parameter is missing' });
    }
    if (!password) {
        return res.json({ isError: true, message: 'password parameter is missing' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = { id: 1, username: username, password: hashedPassword };

    res.json(ResponseFormat(false, "User created successfully", user));
}