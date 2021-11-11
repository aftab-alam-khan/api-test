'use strict'

const router = require('express').Router();
// const Organization = require('../../model/Organization');
const createOrganizationSchema = require('./Schemas/createOrganization');
const deleteOrganizationSchema = require('./Schemas/deleteOrganization');
const queryOrganizationSchema = require('./Schemas/getOrganization');
const updateOrganizationSchema = require('./Schemas/updateOrganization');
const verifyToken = require('../utils/validateToken');

const {
    createOrganization,
    deleteOrganizationByID,
    getOrganization,
    getOrganizationByID,
    getOrganizationByName,
    getOrganizationByCode
} = require('./organizationErrorHandler');

// Create an organization information
router.post('/organizations', verifyToken, async (req, res) => {
    
    const { error } = createOrganizationSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const organization = {
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
        code: req.body.code,
        type: req.body.type,
    };
    try {
        const organizationCreated = await createOrganization(organization)
        res.status(201).send(organizationCreated);
    } catch (err) {
        res.status(400).json({
            "Title": err.title,
            "message": err.message});
    }
});

// Delete an organization information
router.delete('/organizations/:id', verifyToken, async (req, res) => {
    
    const { error } = deleteOrganizationSchema(req.params);
    if (error) return res.status(400).send(error.details[0].message);

    const id = req.params.id;
    try {
        const organizationId = await deleteOrganizationByID(id);
        res.status(200).json({ message: organizationId });
    } catch (err) {
        res.status(400).json({
            "Title": err.title,
            "message": err.message});
    }
});

router.get('/organizations', verifyToken, async (req, res) => {

    const { error } = queryOrganizationSchema(req.query);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, code } = req.query;
    const filter = { code: 0, url: 0 }
    if (name) {
    try {
        const organizationQuery = await getOrganizationByName(name, filter);
        res.status(200).send(organizationQuery);
    } catch (err) {
        res.status(400).json({
            "Title": err.title,
            "message": err.message});
    }
        
    } else if (code) {
    try {
        const organizationQuery = await getOrganizationByCode(code);
        res.status(200).send(organizationQuery);
    } catch (err) {
        res.status(400).json({
            "Title": err.title,
            "message": err.message});
    }
        
    } else {
        try {
            const organizationQuery = await getOrganization(filter);
            res.status(200).send(organizationQuery);
        } catch (err) {
            res.status(400).json({
                "Title": err.title,
                "message": err.message});
        }
    }
});

//Update an Organization information
router.patch('/organizations/:id', verifyToken, async (req, res) => {
    
    const { error } = updateOrganizationSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const id = req.params.id;
    try {
        const organizationQuery = await getOrganizationByID(id, req.body)
        res.status(200).send(organizationQuery);
    } catch (err) {
        res.status(400).json({
            "Title": err.title,
            "message": err.message});
    }
});

module.exports = router;