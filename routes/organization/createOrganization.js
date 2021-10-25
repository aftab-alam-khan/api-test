'use strict'

const router = require('express').Router();
const Organization = require('../../model/Organization');
const createOrganizationSchema = require('./Schemas/createOrganization');
const CreateOrganizationError = require('./errorhandle/oganizationErrorHandle')


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
        throw new CreateOrganizationError('Caught an Error while creating an Organization')
    } finally {
        res.status(400).send(err);
        if (err instanceof CreateOrganizationError) {
            res.status(400).send(`${err.name}: ${err.message}`);
        } else {
            res.status(400).send(err);
        }
    }
});

module.exports = router;