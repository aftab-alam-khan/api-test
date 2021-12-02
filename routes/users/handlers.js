'use strict'

const router = require('express').Router();
const { hashUserPassowrd } = require('../utils/user');
const { userValidator } = require('./schemas');
const verifyToken = require('../utils/validateToken');
const {
    login,
    createUsers,
    getUsers
} = require('./services');

router.post('/user/login', async (req, res) => {
    const { error } = userValidator(req.body);
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

router.post('/user', verifyToken, async (req, res) => {
    
    const { error } = userValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const userInfo = {
        email: req.body.email,
        password: req.body.password,
        roundSalts: 10
    };
    const getHashUser = await hashUserPassowrd(userInfo.email, userInfo.password, userInfo.roundSalts);

    try {
        const newuser = await createUsers(getHashUser);
        res.status(201).send(newuser);
    } catch (err) {
        res.status(400).json({
            "Title": err.title,
            "message": err.message});
    }
});

router.get('/users', verifyToken, async (req, res) => {
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