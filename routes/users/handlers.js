'use strict'


const { hashUserPassowrd } = require('../utils/user');
const { userValidator } = require('./schemas');
const verifyToken = require('../utils/validateToken');
const {
    login,
    createUsers,
    getUsers,
    deleteUserByID
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
            const accessToken = await login(request.payload.email, request.payload.password);
            return reply.response(accessToken).code(201)
        } catch (err) {
            return reply.response({
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
            ...request.payload,
            roundSalts: 10
        };
        const getHashUser = await hashUserPassowrd(userInfo.email, userInfo.password, userInfo.roundSalts);

        try {
            const newuser = await createUsers(getHashUser);
            return reply.response(newuser).code(201);
        } catch (err) {
            return reply.response({
                "Title": err.title,
                "message": err.message
            }).code(400);
        }
    }
},
{
    method: 'GET',
    path: '/users',
    handler: async (request, reply) => {

        try {
            const organizationQuery = await getUsers();
            return reply.response(organizationQuery).code(200);
        } catch (err) {
            return reply.response({
                "Title": err.title,
                "message": err.message
            }).code(400);
        }
    },
    options: {
        auth: 'jwtAccess'
    }
},
{
    method: 'DELETE',
    path: '/users/{id}',
    handler: async (request, reply) => {

        const id = request.params.id;
        try {
            const userId = await deleteUserByID(id);
            return reply.response({ message: userId }).code(200);
        } catch (err) {
            return reply.response({
                "Title": err.title,
                "message": err.message
            }).code(400);
        }
    }
}]

module.exports = userRoutes;