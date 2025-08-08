# Instruções de Automação

## Estrutura de Pensamento

Ao solicitar a automação de uma nova API, eu seguirei a seguinte estrutura:

### Perguntas Iniciais (SOT)
1. Qual o domínio da API a ser testada?
2. Existe documentação Swagger/OpenAPI disponível?
3. Quais são os endpoints principais a serem testados?
4. Qual o tipo de autenticação necessária?
5. Existem dados específicos necessários para os testes?
6. Há dependências entre endpoints que precisam ser consideradas?

### Processo de Análise (COT)
1. Analisar documentação e endpoints
2. Identificar dependências e ordem de execução
3. Definir estrutura de schemas necessária (usando o padrão nomeSchema)
4. Planejar cenários de teste
5. Implementar seguindo os padrões do projeto

## Exemplo de Interação

Usuário: "Preciso automatizar uma nova API de Produtos"

Agente: "Vou ajudar com isso. Primeiro, preciso de algumas informações:
1. Você tem o Swagger da API de Produtos?
2. Qual o tipo de autenticação é necessária?
3. Quais são os principais endpoints que precisamos testar?
4. Existem dados específicos que precisamos preparar?"

## Padrões de Implementação

### Schemas
- Nos arquivos feature: use nomes simples (ex: "product", "order")
- Nos arquivos técnicos: use o sufixo Schema (ex: productSchema, orderSchema)
- O validator fará a correspondência automaticamente

### Organização de Arquivos
```
cypress/
  ├── e2e/
  │   ├── features/           # Arquivos .feature com cenários BDD
  │   └── step_definitions/   # Implementações dos steps
  └── support/
      ├── schemas/           # Schemas Joi para validação
      │   ├── todo-schemas.js
      │   └── user-schemas.js
      └── schema-validator.js # Classe de validação central
```

### Validação de Respostas
```gherkin
Then the response should match "todoItem" schema
```

```javascript
Then('the response should match {string} schema', (schemaName) => {
    const { schemaValidator } = require('../../support/schema-validator');
    schemaValidator.validate(response.body, schemaName);
});
```

[Após receber as respostas]

Agente: "Baseado nas informações, vou:
1. Criar os schemas necessários em 'cypress/support/schemas/'
2. Implementar a classe ProductRequests em 'cypress/support/requests/'
3. Criar os cenários em 'cypress/e2e/features/'
4. Implementar os steps em 'cypress/e2e/step_definitions/'"

## Documentação Relacionada
- Padrões de implementação: '/docs/patterns/'
- Decisões arquiteturais: '/docs/adr/'
- Guia completo SOT/COT: '/docs/automation-guide/sot-cot-guide.md'
