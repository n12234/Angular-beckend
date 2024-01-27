const Joi = require('joi')

const productValidator = Joi.object(
    {
        title: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
        category: Joi.string().required(),
        // count: Joi.string().required()
    }
)

module.exports = productValidator;