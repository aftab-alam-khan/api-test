'use strict';

const Joi = require('joi');
Joi.objectId - require('joi-objectid')(Joi)

const querySchema = (data) => {
    const schema = Joi.object({
        name: Joi.string().optional(),
        code: Joi.string().optional()
    });
    return schema.validate(data);
};
module.exports = querySchema;