'use strict'

const Joi = require('joi');

const organizationValidator = (data) => {
    const schema = Joi.object({

        name: Joi.string().required().min(6).max(55),
        description: Joi.string().required().min(6).max(255),
        url: Joi.string().required(),
        code: Joi.string().required(),
        type: Joi.string().required(),
    });
    return schema.validate(data);
};

const idValidator = (data) => {
    const schema = Joi.object({
        id: Joi.required()
    });
    return schema.validate(data);
};

const queryValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().optional(),
        code: Joi.string().optional()
    });
    return schema.validate(data);
};

module.exports = {
    organizationValidator,
    idValidator,
    queryValidator
};