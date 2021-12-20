'use strict'

const Joi = require('joi');

const organizationValidator = Joi.object({

    name: Joi.string().required().min(6).max(55),
    description: Joi.string().required().min(6).max(255),
    url: Joi.string().required(),
    code: Joi.string().required(),
    type: Joi.string().required(),
})

const idValidator = Joi.object({
        id: Joi.required()
    })

const queryValidator = Joi.object({
        name: Joi.string().optional(),
        code: Joi.string().optional()
    })

module.exports = {
    organizationValidator,
    idValidator,
    queryValidator
};