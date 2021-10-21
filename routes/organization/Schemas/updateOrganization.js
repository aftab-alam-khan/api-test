'use strict'

const Joi = require('joi');

const payloadSchema = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        url: Joi.string(),
        code: Joi.string().required(),
        type: Joi.string(),
    });
    return schema.validate(data);
};

module.exports = payloadSchema;