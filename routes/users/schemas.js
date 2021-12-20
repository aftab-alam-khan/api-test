'use strict'

const Joi = require('joi');

const userValidator = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })

module.exports = { userValidator };