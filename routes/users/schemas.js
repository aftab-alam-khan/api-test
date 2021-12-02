'use strict'

const Joi = require('joi');

const userValidator = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    return schema.validate(data);
}

module.exports = { userValidator };