const Joi = require('joi');
const { commonPatterns } = require('./common-schemas');

const todoItemSchema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    completed: Joi.boolean().required(),
    userId: Joi.number().required(),
    dueDate: Joi.date().iso().allow(null)
});

const todoListSchema = Joi.array().items(todoItemSchema);

const todoErrorSchema = Joi.object({
    status: Joi.number().required(),
    message: Joi.string().required(),
    details: Joi.array().items(Joi.string()).optional()
});

module.exports = {
    todoItemSchema,
    todoListSchema,
    todoErrorSchema
};
