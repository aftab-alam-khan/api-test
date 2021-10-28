'use strict'

const Organization = require('../../model/Organization');

const organizationRouter = [
    {
        method: 'GET',
        path: '/organizations',
        handler: async (request, h) => {
            try {
                const organizationQuery = await Organization.find({}).select({ code: 0, url: 0});
                res.status(200).send(organizationQuery);
            } catch (err) {
                res.status(400).send(err);
            }
            return h.response('Updated');
        }
    },
]

module.exports = organizationRouter;