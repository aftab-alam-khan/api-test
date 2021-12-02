'use strict'

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../model/User');

const login = async (email, password) => {

  try {

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Email doesn't exists.");

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Password is Invalid.');

    const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIREIN });
    return { id_token: accessToken };
  } catch (error) {
    throw new ErrorHandle('User Login Error', `Failed to login for a user ${email}`)
  }
};

const createUsers = async (user) => {
    
  try {
    const newUser = new User(user);
    await newUser.save();
    return newUser;
  }
  catch (error) {
    throw new ErrorHandle('Create User Error', `Failed to create a new user: ${user}`)
  }
};

const getUsers = async (filter) => {
  try {
    const organizationQuery = await User.find({});
    return organizationQuery;
  } catch (error) {
    throw new ErrorHandle('Get Users Error', 'Failed to get Users list')
  }
};

module.exports = {
  login,
  createUsers,
  getUsers
}