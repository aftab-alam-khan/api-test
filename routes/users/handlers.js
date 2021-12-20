'use strict'


const { hashUserPassowrd } = require('../utils/user');
const { userValidator } = require('./schemas');
const verifyToken = require('../utils/validateToken');
const {
    login,
    createUsers,
    getUsers
} = require('./services');

const userRoutes = [{
    method: 'POST',
    path: '/user/login',
    options: {
        validate: {
            payload: userValidator
        }
    },
    handler: async (request, reply) => {

        try {
            const accessToken = await login(request.body.email, request.body.password,)
            reply(accessToken).code(201)
        } catch (err) {
            reply({
                "Title": err.title,
                "message": err.message
            }).code(400);
        }
    }
},
{
    method: 'POST',
    path: '/user',
    options: {
        validate: {
            payload: userValidator
        }
    },
    handler: async (request, reply) => {

        const userInfo = {
            email: request.body.email,
            password: request.body.password,
            roundSalts: 10
        };
        const getHashUser = await hashUserPassowrd(userInfo.email, userInfo.password, userInfo.roundSalts);

        try {
            const newuser = await createUsers(getHashUser);
            reply(newuser).code(201);
        } catch (err) {
            reply({
                "Title": err.title,
                "message": err.message
            }).code(400);
        }
    }
},
{
    method: 'POST',
    path: '/users',
    handler: async (request, reply) => {

        try {
            const organizationQuery = await getUsers();
            reply(organizationQuery).code(200);
        } catch (err) {
            reply({
                "Title": err.title,
                "message": err.message
            }).code(400);
        }
    }
}]

module.exports = userRoutes;