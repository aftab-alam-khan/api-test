'use strict'

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../model/User');
const userSchema = require('./Schemas/user');
const {
    login,
    users,
    getUsers
} = require('./userErrorHandler');

router.post('/user/login', async (req, res) => {
    const { error } = userSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const accessToken = await login(req.body.email, req.body.password,)
        res.status(201).json(accessToken)
    } catch (err) {
        res.status(400).json({
            "Title": err.title,
            "message": err.message});
    }
});

router.post('/user', async (req, res) => {
    
    const { error } = userSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const user = {
        email: req.body.email,
        password: hashedPassword
    };

    try {
        const newuser = await users(user);
        res.status(201).send(newuser);
    } catch (err) {
        res.status(400).json({
            "Title": err.title,
            "message": err.message});
    }
});

router.get('/users', async (req, res) => {
    try {
        const organizationQuery = await getUsers();
        res.status(200).send(organizationQuery);
    } catch (err) {
        res.status(400).json({
            "Title": err.title,
            "message": err.message});
    }
});

module.exports = router;