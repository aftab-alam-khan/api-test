'use strict'

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../model/User');
const userSchema = require('./Schemas/user');

router.post('/users/login', async (req, res) => {
    const { error } = userSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email doesn't exists.");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Password is Invalid.');

    const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIREIN});
    res.status(201).send({ id_token: accessToken });
});

router.post('/users', async (req, res) => {
    
    const { error } = userSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });
    try {
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;