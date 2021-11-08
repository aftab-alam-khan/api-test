'use strict'

const router = require('express').Router();
const Organization = require('../../model/Organization');
const createOrganizationSchema = require('./Schemas/createOrganization');
const deleteOrganizationSchema = require('./Schemas/deleteOrganization');
const queryOrganizationSchema = require('./Schemas/getOrganization');
const updateOrganizationSchema = require('./Schemas/updateOrganization');
const verifyToken = require('../utils/validateToken');

// Create an organization information
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

// Delete an organization information
router.delete('/organizations/:id', async (req, res) => {
    
    const { error } = deleteOrganizationSchema(req.params);
    if (error) return res.status(400).send(error.details[0].message);

    const _id = req.params.id;
    try {
        await Organization.findByIdAndRemove({ _id });
        res.status(204).send(`${_id} Successuly deleted  `);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get organization information
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

//Update an Organization information
router.patch('/organizations/:id', async (req, res) => {
    
    const { error } = updateOrganizationSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const _id = req.params.id;
    try {
        await Organization.updateOne({ _id },
            { $set: req.body });
        res.status(204);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;