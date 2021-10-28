'use strict'

const router = require('express').Router();
const Organization = require('../../model/Organization');
const updateOrganizationSchema = require('./Schemas/updateOrganization');


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