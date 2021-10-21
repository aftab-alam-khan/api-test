'use strict'

const Joi = require('joi');

const user = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    return schema.validate(data);
}

module.exports = user;