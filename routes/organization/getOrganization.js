'use strict'

const router = require('express').Router();
const Organization = require('../../model/Organization');
const queryOrganizationSchema = require('./Schemas/getOrganization');
const verifyToken = require('../utils/validateToken');
const GetOrganizationError = require('./errorhandle/oganizationErrorHandle')


router.get('/organizations', async (req, res) => {
    
    try {
        const organizationQuery = await Organization.find({}).select({ code: 0, url: 0});
        if (!(organizationQuery instanceof Object)) {
            throw new GetOrganizationError('Caught an Error while fetching an "/organizations" information')
        }
        res.status(200).send(organizationQuery);
    } catch (err) {
        if (err instanceof GetOrganizationError) {
            res.status(400).send(`${err.name}: ${err.message}`);
        } else {
            res.status(400).send(`err.message ${err.message}`);
        }
    }
});

router.get('/organizations/name/:name', verifyToken, async (req, res) => {
    
    const { error } = queryOrganizationSchema(req.params);
    if (error) return res.status(400).send(error.details[0].message);

    const name = req.params.name;
    try {
        const organizationQuery = await Organization.find({ name }).select({ code: 0, url: 0 });
        if (!(organizationQuery instanceof Object)) {
            throw new GetOrganizationError(`Caught an Error while fetching an Organization information by name ${name}`)
        }
        res.status(200).send(organizationQuery);
    } catch (err) {
        if (err instanceof GetOrganizationError) {
            res.status(400).send(`${err.name}: ${err.message}`);
        } else {
            res.status(400).send(err);
        }
    }
});

router.get('/organizations/code/:code', verifyToken, async (req, res) => {
    
    const { error } = queryOrganizationSchema(req.params);
    if (error) return res.status(400).send(error.details[0].message);

    const code = req.params.code;
    try {
        const organizationQuery = await Organization.find({ code });
        if (!(organizationQuery instanceof Object)) {
            throw new GetOrganizationError(`Caught an Error while fetching an Organization information by code ${code}`)
        }
        res.status(200).send(organizationQuery);
    } catch (err) {
        if (err instanceof GetOrganizationError) {
            res.status(400).send(`${err.name}: ${err.message}`);
        } else {
            res.status(400).send(err);
        }
    }
});
module.exports = router;