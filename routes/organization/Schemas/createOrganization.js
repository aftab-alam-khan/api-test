'use strict'

const Joi = require('joi');

const createOrganization = (data) => {
    const schema = Joi.object({

        name: Joi.string().required().min(6).max(55),
        description: Joi.string().required().min(6).max(255),
        url: Joi.string().required(),
        code: Joi.string().required(),
        type: Joi.string().required(),
    });
    return schema.validate(data);
};

module.exports = createOrganization;