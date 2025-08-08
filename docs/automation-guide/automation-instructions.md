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
7. **OBRIGATÓRIO**: Quais são os cenários de teste para cada endpoint?
   - O usuário deve informar os cenários já em formato BDD, OU
   - Fornecer os cenários para serem convertidos para BDD

### Processo de Análise (COT)
1. Analisar documentação e endpoints
2. Identificar dependências e ordem de execução
3. Definir estrutura de schemas necessária (usando o padrão nomeSchema)
4. Planejar cenários de teste
5. **CONFIRMAR PLANO COM O USUÁRIO**
6. Implementar seguindo os padrões do projeto

### ⚠️ IMPORTANTE: Confirmação do Plano de Execução

**SEMPRE antes de executar o plano, o agente deve:**

1. **Explicar o plano detalhadamente:**
   - Quais arquivos serão criados/modificados
   - Estrutura de features que será implementada
   - Schemas que serão criados
   - Endpoints que serão cobertos

2. **Apresentar exemplo da estrutura:**
   ```
   Vou criar a seguinte estrutura:
   
   📁 cypress/e2e/features/
   ├── get-products.feature         # Cenários: busca com sucesso, filtros, paginação
   ├── post-products.feature        # Cenários: criação com sucesso, validações
   └── get-products-by-id.feature   # Cenários: busca por ID válido/inválido
   
   📁 cypress/support/schemas/
   └── products-schemas.js          # productSchema, productListSchema
   
   📁 cypress/support/requests/
   └── productRequests.js           # Handlers das requisições
   ```

3. **Perguntar explicitamente:**
   ```
   "Você gostaria de alterar algo neste plano antes de eu executar? 
   Por exemplo:
   - Adicionar/remover cenários?
   - Modificar a estrutura de arquivos?
   - Incluir validações específicas?"
   ```

4. **Aguardar confirmação** antes de proceder com a implementação

## Exemplo de Interação

Usuário: "Preciso automatizar uma nova API de Produtos"

Agente: "Vou ajudar com isso. Primeiro, preciso de algumas informações:
1. Você tem o Swagger da API de Produtos?
2. Qual o tipo de autenticação é necessária?
3. Quais são os principais endpoints que precisamos testar?
4. **OBRIGATÓRIO**: Quais são os cenários de teste para cada endpoint? 
   (Pode ser em BDD ou descrição para eu converter)
5. Existem dados específicos que precisamos preparar?"

## Padrões de Implementação

### Estrutura de Features - REGRA FUNDAMENTAL
**CADA ENDPOINT DEVE TER SEU PRÓPRIO ARQUIVO .feature**

Exemplo para uma API com 3 endpoints:
```
cypress/e2e/features/
├── get-products.feature         # GET /products
├── post-products.feature        # POST /products  
└── get-products-by-id.feature   # GET /products/{id}
```

### Requisitos de Cenários de Teste
**É OBRIGATÓRIO informar os cenários de teste para cada endpoint:**

**Opção 1 - Cenários já em BDD:**
```gherkin
Feature: GET /products
  Scenario: Buscar produtos com sucesso
    Given I have a valid API endpoint
    When I send a GET request to "/products"
    Then the response status should be 200
    And the response should match "productList" schema
```

**Opção 2 - Cenários descritivos (para conversão):**
```
Cenários para GET /products:
1. Buscar produtos com sucesso - deve retornar status 200 e lista de produtos
2. Buscar produtos sem autenticação - deve retornar status 401
3. Buscar produtos com filtro inválido - deve retornar status 400
```

### Schemas
- Nos arquivos feature: use nomes simples (ex: "product", "order")
- Nos arquivos técnicos: use o sufixo Schema (ex: productSchema, orderSchema)
- O validator fará a correspondência automaticamente

### Organização de Arquivos
```
cypress/
  ├── e2e/
  │   ├── features/           # UM ARQUIVO .feature POR ENDPOINT
  │   │   ├── get-products.feature
  │   │   ├── post-products.feature
  │   │   └── get-products-by-id.feature
  │   └── step_definitions/   # Implementações dos steps (pode agrupar por domínio)
  │       ├── products.js
  │       └── users.js
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
1. Criar UM arquivo .feature para CADA endpoint identificado
2. Implementar os cenários de teste fornecidos (ou converter os cenários descritivos para BDD)
3. Criar os schemas necessários em 'cypress/support/schemas/'
4. Implementar a classe de Requests em 'cypress/support/requests/'
5. Implementar os steps em 'cypress/e2e/step_definitions/'"

## Lições Valiosas - Boas Práticas

### 1. Estrutura de Features
- **SEMPRE**: Um arquivo .feature por endpoint
- **NUNCA**: Agrupar múltiplos endpoints em um único .feature
- **MOTIVO**: Facilita manutenção, execução isolada e organização

### 2. Cenários de Teste - OBRIGATÓRIOS
- **SEMPRE** solicitar cenários antes da implementação
- **ACEITAR**: BDD pronto ou descrição para conversão
- **MOTIVO**: Garante cobertura adequada e alinhamento com expectativas

### 3. Estrutura de Pergunta Padrão
```
Para cada novo endpoint, SEMPRE perguntar:
1. Qual endpoint? (método + path)
2. Quais cenários de teste?
3. Qual autenticação?
4. Dados específicos necessários?
5. Dependências?
```

### 4. Padrões de Implementação - OBRIGATÓRIOS

#### **Requests - SEMPRE usar a classe base**
❌ **ERRADO - Não fazer:**
```javascript
class MemberRequests {
  constructor() {
    this.baseUrl = '...';
  }
  
  getMemberLinks() {
    return cy.request({
      method: 'GET',
      url: url,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
module.exports = new MemberRequests();
```

✅ **CORRETO - Sempre seguir este padrão:**
```javascript
import Requests from './requests';

class MemberRequests {
    static baseUrl = Cypress.env('API_BASE_URL') || '/api/v1';

    static getMemberLinks(options = {}) {
        const { memberLinkId, ...requestOptions } = options;
        let url = `${this.baseUrl}/member-link`;
        
        if (memberLinkId) {
            url += `?memberLinkId=${memberLinkId}`;
        }

        return Requests.get(url, {
            failOnStatusCode: false,
            ...requestOptions
        });
    }
}

export default MemberRequests;
```

#### **Step Definitions - Sempre importar corretamente**
✅ **CORRETO:**
```javascript
import MemberRequests from '../../support/requests/memberRequests';
// Usar: MemberRequests.getMemberLinks()
```

❌ **ERRADO:**
```javascript
const memberRequests = require('../../support/requests/memberRequests');
// Não usar require para classes que exportam com export default
```

#### **Schemas - Seguir padrão de nomenclatura**
- Arquivo: `member-schemas.js`
- Exports: `memberLinkSchema`, `getMemberLinksRspSchema`
- Uso nos testes: `"getMemberLinksRsp"` (sem Schema no final)

## Documentação Relacionada
- Padrões de implementação: '/docs/patterns/'
- **Padrões de Requests**: '/docs/patterns/request-patterns.md'
- Decisões arquiteturais: '/docs/adr/'
- Guia completo SOT/COT: '/docs/automation-guide/sot-cot-guide.md'
