'use strict'

const router = require('express').Router();
const { organizationValidator,
    idValidator,
    queryValidator
} = require('./schemas');
const verifyToken = require('../utils/validateToken');
const { getOrganizationInstanceByNameOrCode } = require('../utils/organization');

const {
    createOrganization,
    deleteOrganizationByID,
    getOrganizationByID
} = require('./services');

// Create an organization information
router.post('/organizations', verifyToken, async (req, res) => {
    
    const { error } = organizationValidator(req.body);
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
    
    const { error } = idValidator(req.params);
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

    const { error } = queryValidator(req.query);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, code } = req.query;
    const filter = { code: 0, url: 0 }
    const organizationInstance = getOrganizationInstanceByNameOrCode(name, code, filter)

    try {
        const data = await organizationInstance.fun(...organizationInstance.args)
        res.status(200).send(data);
    } catch (err) {
        res.status(400).json({
            "Title": err.title,
            "message": err.message});
    }
});

//Update an Organization information
router.patch('/organizations/:id', verifyToken, async (req, res) => {
    
    const { error } = organizationValidator(req.body);
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