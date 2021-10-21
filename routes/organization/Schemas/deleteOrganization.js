'use strict'

const Joi = require('joi');

const paramasSchema = (data) => {
    const schema = Joi.object({
        id: Joi.required()
    });
    return schema.validate(data);
};

module.exports = paramasSchema;