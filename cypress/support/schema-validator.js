const Joi = require('joi');
const todoSchemas = require('./schemas/todo-schemas');

// Mapeamento central de schemas
const schemas = {
    ...todoSchemas
    // Aqui você pode adicionar outros schemas facilmente:
    // ...userSchemas,
    // ...productSchemas,
    // etc...
};

class SchemaValidator {
    validate(data, schemaName) {
        // Procura primeiro pelo nome exato, depois tenta com o sufixo Schema
        const schema = schemas[schemaName] || schemas[`${schemaName}Schema`];
        
        if (!schema) {
            // Remove o sufixo 'Schema' dos nomes ao mostrar as opções disponíveis
            const availableSchemas = Object.keys(schemas)
                .map(name => name.replace('Schema', ''))
                .join(', ');
            
            throw new Error(`Schema '${schemaName}' não encontrado. Schemas disponíveis: ${availableSchemas}`);
        }

        const { error } = schema.validate(data, { abortEarly: false });
        
        if (error) {
            throw new Error(`Falha na validação do schema: ${error.message}`);
        }
        
        return true;
    }
}

const schemaValidator = new SchemaValidator();
module.exports = { schemaValidator };
