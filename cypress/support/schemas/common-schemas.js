const Joi = require('joi');

// Common schema patterns
const commonPatterns = {
  id: Joi.number().required(),
  uuid: Joi.string().guid({ version: 'uuidv4' }).required(),
  timestamp: Joi.date().iso().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required(),
};

// Common error schema
const errorSchema = Joi.object({
  status: Joi.number().required(),
  message: Joi.string().required(),
  code: Joi.string().optional(),
  details: Joi.array().items(Joi.string()).optional()
});

// Pagination schema
const paginationSchema = Joi.object({
  page: Joi.number().min(1).required(),
  limit: Joi.number().min(1).required(),
  total: Joi.number().min(0).required(),
  totalPages: Joi.number().min(0).required()
});

module.exports = {
  commonPatterns,
  errorSchema,
  paginationSchema
};
