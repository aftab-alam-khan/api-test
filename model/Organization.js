'use strict'

const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 55
    },
    description: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    url: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Organization', organizationSchema);
