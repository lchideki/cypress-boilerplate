# Schema Organization with Joi

## Directory Structure

```
cypress/support/schemas/
├── common-schemas.js     # Padrões comuns e utilitários
├── user-schemas.js       # Schemas relacionados a usuários
└── other-domain-schemas.js
```

## Common Patterns (common-schemas.js)

```javascript
const commonPatterns = {
  id: Joi.number().required(),
  uuid: Joi.string().guid({ version: 'uuidv4' }),
  timestamp: Joi.date().iso(),
  email: Joi.string().email(),
  // ... outros padrões comuns
};

// Schemas base para reuso
const paginationSchema = Joi.object({
  page: Joi.number().min(1),
  limit: Joi.number().min(1),
  total: Joi.number().min(0)
});

const errorSchema = Joi.object({
  status: Joi.number(),
  message: Joi.string()
});
```

## Domain Schemas (example: user-schemas.js)

```javascript
const userSchema = Joi.object({
  id: commonPatterns.id,
  email: commonPatterns.email,
  createdAt: commonPatterns.timestamp,
  // ... campos específicos
});

// Schema para criação (sem campos automáticos)
const createUserSchema = userSchema.keys({
  id: Joi.forbidden(),
  createdAt: Joi.forbidden()
});

// Schema para listagem com paginação
const userListSchema = Joi.object({
  users: Joi.array().items(userSchema),
  pagination: paginationSchema
});
```

## Best Practices

1. **Reutilização**
   - Use `commonPatterns` para campos padronizados
   - Estenda schemas base para casos específicos
   - Componha schemas para estruturas complexas

2. **Validação**
   - Configure opções padrão no SchemaValidator
   - Use mensagens de erro personalizadas quando necessário
   - Valide dados aninhados adequadamente

3. **Manutenção**
   - Documente schemas complexos
   - Mantenha schemas organizados por domínio
   - Atualize schemas quando a API mudar
