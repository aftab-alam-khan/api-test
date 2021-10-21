'use strict'

const router = require('express').Router();
const Organization = require('../../model/Organization');
const queryOrganizationSchema = require('./Schemas/getOrganization');
const verifyToken = require('../utils/validateToken');


router.get('/organizations', async (req, res) => {
    
    try {
        const organizationQuery = await Organization.find({}).select({ code: 0, url: 0});
        res.status(200).send(organizationQuery);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/organizations/name/:name', verifyToken, async (req, res) => {
    
    const { error } = queryOrganizationSchema(req.params);
    if (error) return res.status(400).send(error.details[0].message);

    const name = req.params.name;
    try {
        const organizationQuery = await Organization.find({ name }).select({ code: 0, url: 0});
        res.status(200).send(organizationQuery);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/organizations/code/:code', verifyToken, async (req, res) => {
    
    const { error } = queryOrganizationSchema(req.params);
    if (error) return res.status(400).send(error.details[0].message);

    const code = req.params.code;
    try {
        const organizationQuery = await Organization.find({ code });
        res.status(200).send(organizationQuery);
    } catch (err) {
        res.status(400).send(err);
    }
});
module.exports = router;