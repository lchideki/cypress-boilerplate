# Schema Validation Guide

## Estrutura de Validação

O framework utiliza uma abordagem simplificada para validação de schemas, baseada em Joi, que permite validar as respostas da API de forma clara e consistente.

## Nomenclatura

### Nos Arquivos de Feature
Utilize nomes simples e diretos, sem o sufixo `Schema`:
```gherkin
And the response should match "todoItem" schema
And the response should match "todoList" schema
```

### Nos Arquivos Técnicos
Nos arquivos de definição de schema, use o sufixo `Schema` para maior clareza:
```javascript
const todoItemSchema = Joi.object({...});
const todoListSchema = Joi.object({...});
```

O validator automaticamente faz a correspondência entre os nomes, então `todoItem` no feature file corresponderá a `todoItemSchema` no código.

## Definindo Schemas

```javascript
// schemas/todo-schemas.js
const Joi = require('joi');

const todoItemSchema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    completed: Joi.boolean().required(),
    userId: Joi.number().required()
});

module.exports = {
    todoItemSchema,
    todoListSchema,
    todoErrorSchema
};
```

## Usando nos Testes

Nos arquivos de step definitions:
```javascript
Then('the response should match {string} schema', (schemaName) => {
    const { schemaValidator } = require('../../support/schema-validator');
    schemaValidator.validate(response.body, schemaName);
});
```

## Adicionando Novos Schemas

1. Crie seu schema no arquivo apropriado (ex: `user-schemas.js`)
2. Exporte o schema com o sufixo `Schema`
3. Importe e adicione ao objeto `schemas` no `schema-validator.js`

```javascript
const schemas = {
    ...todoSchemas,
    ...userSchemas,
    // adicione mais schemas conforme necessário
};
```

## Mensagens de Erro

O validator fornece mensagens de erro claras:
- Lista todos os schemas disponíveis (sem o sufixo Schema)
- Mostra todos os erros de validação de uma vez (abortEarly: false)
- Inclui detalhes específicos sobre o que falhou na validação

## Boas Práticas

1. Mantenha os schemas organizados por domínio (todo-schemas.js, user-schemas.js, etc.)
2. Use nomes claros e diretos nos arquivos feature
3. Mantenha o sufixo Schema nos arquivos técnicos para clareza
4. Reutilize schemas comuns quando possível
5. Documente campos complexos ou regras de negócio específicas
};

// Using patterns
const schema = Joi.object({
  id: commonPatterns.id,
  email: commonPatterns.email,
  createdAt: commonPatterns.timestamp
});
```

## Schema Composition

```javascript
// Base schema
const baseUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required()
});

// Extended schema for creation
const createUserSchema = baseUserSchema.keys({
  password: Joi.string().min(8).required()
});

// Extended schema for response
const userResponseSchema = baseUserSchema.keys({
  id: Joi.number().required(),
  createdAt: Joi.date().iso().required()
});
```

## Validation Options

```javascript
cy.validateResponse(response, {
  status: 200,
  schema: userSchema,
  schemaOptions: {
    abortEarly: false,     // Retorna todos os erros
    allowUnknown: true,    // Permite campos extras
    stripUnknown: false    // Não remove campos extras
  }
});
```

## Advanced Validations

```javascript
// Array validation
const userListSchema = Joi.object({
  users: Joi.array().items(userSchema).min(1).required(),
  pagination: Joi.object({
    page: Joi.number().min(1).required(),
    total: Joi.number().min(0).required()
  }).required()
});

// Conditional validation
const productSchema = Joi.object({
  type: Joi.string().valid('physical', 'digital').required(),
  weight: Joi.when('type', {
    is: 'physical',
    then: Joi.number().required(),
    otherwise: Joi.forbidden()
  })
});
```

## Error Handling

```javascript
const errorSchema = Joi.object({
  status: Joi.number().required(),
  message: Joi.string().required(),
  code: Joi.string().required(),
  details: Joi.array().items(
    Joi.object({
      field: Joi.string().required(),
      message: Joi.string().required()
    })
  ).optional()
});
```
