'use strict'

const router = require('express').Router();
const Organization = require('../../model/Organization');
const createOrganizationSchema = require('./Schemas/createOrganization');


router.post('/organizations', async (req, res) => {
    
    const { error } = createOrganizationSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const organizationCreated = new Organization({
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
        code: req.body.code,
        type: req.body.type,
    });
    try {
        await organizationCreated.save();
        res.status(201).send(organizationCreated);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;