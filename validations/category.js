const Joi = require('joi')

const categoryValidator = Joi.object(
    {
        title: Joi.string().required(),
        description: Joi.string().required(),
    }
)

module.exports = categoryValidator;