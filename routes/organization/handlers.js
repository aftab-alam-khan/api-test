'use strict'

const verifyToken = require('../utils/validateToken');
const { getOrganizationInstanceByNameOrCode } = require('../utils/organization');

const { organizationValidator,
    idValidator,
    queryValidator } = require('./schemas')
const {
    createOrganization,
    deleteOrganizationByID,
    getOrganizationByID
} = require('./services');

const organizationRoutes = [{
    method: 'POST',
    path: '/organizations',
    options: {
        validate: {
            payload: organizationValidator
        }
    },
    handler: async (request, reply) => {

        const organization = {
            name: request.body.name,
            description: request.body.description,
            url: request.body.url,
            code: request.body.code,
            type: request.body.type,
        };
        try {
            const organizationCreated = await createOrganization(organization)
            return reply(organizationCreated).code(201);
        } catch (err) {
            return reply({
                "Title": err.title,
                "message": err.message
            }).code(400);
        }
    }
}, {
    method: 'DELETE',
    path: '/organizations/{id}',
    options: {
        validate: {
            params: idValidator
        }
    },
    handler: async (request, reply) => {

        const id = request.params.id;
        try {
            const organizationId = await deleteOrganizationByID(id);
            return reply({ message: organizationId }).code(200);
        } catch (err) {
            return reply({
                "Title": err.title,
                "message": err.message
            }).code(400);
        }
    }
}, {
    method: 'GET',
    path: '/organizations',
    options: {
        validate: {
            query: queryValidator
        }
    },
    handler: async (request, reply) => {

        const { name, code } = request.query;
        const filter = { code: 0, url: 0 }
        const organizationInstance = getOrganizationInstanceByNameOrCode(name, code, filter)

        try {
            const data = await organizationInstance.fun(...organizationInstance.args)
            console.log(data);
            return reply(data).code(200);
        } catch (err) {
            return reply({
                "Title": err.title,
                "message": err.message
            }).code(400);
        }
    }
}, {
    method: 'PATCH',
    path: '/organizations/{id}',
    options: {
        validate: {
            payload: organizationValidator
        }
    },
    handler: async (request, reply) => {

        const id = request.params.id;
        try {
            const organizationQuery = await getOrganizationByID(id, request.body)
            return reply(organizationQuery).code(200);
        } catch (err) {
            return reply({
                "Title": err.title,
                "message": err.message
            }).code(400);
        }
    }
}];

module.exports = organizationRoutes;