'use strict'

const router = require('express').Router();
const Organization = require('../../model/Organization');
const deleteOrganizationSchema = require('./Schemas/deleteOrganization');


router.delete('/organizations/:id', async (req, res) => {
    
    const { error } = deleteOrganizationSchema(req.params);
    if (error) return res.status(400).send(error.details[0].message);

    const _id = req.params.id;
    try {
        await Organization.findByIdAndRemove({ _id });
        res.status(204);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;