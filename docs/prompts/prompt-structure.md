# Guia de Automação - Skeleton of Thought e Chain of Thought

## Skeleton of Thought (SOT)

### 1. Coleta de Informações

#### Requisitos Obrigatórios ⚠️
- **Documentação**
  - [OBRIGATÓRIO] URL do Swagger/OpenAPI ou documentação equivalente detalhada
  - [OBRIGATÓRIO] Exemplos de request/response para cada endpoint
  
- **Ambiente**
  - [OBRIGATÓRIO] URL base do ambiente de teste
  - [OBRIGATÓRIO] Ambiente isolado ou forma de limpar dados de teste

- **Autenticação**
  - [OBRIGATÓRIO] Tipo de autenticação (Bearer, Basic, API Key, etc)
  - [OBRIGATÓRIO] Credenciais de teste ou processo para obtê-las

#### Requisitos Complementares
- **Domínio**
  - Nome do domínio/área
  - Objetivo principal da API
  - Regras de negócio específicas

- **Dados Adicionais**
  - Massa de dados específica (se necessário)
  - Dados sensíveis/mascarados
  - Processos de limpeza de dados

- **Integrações**
  - Dependências com outros sistemas
  - Webhooks ou callbacks
  - Timeouts específicos

### 2. Análise de Endpoints
- **Endpoints Críticos**
  - Principais fluxos
  - Dependências entre endpoints
  - Ordem de execução

- **Validações Necessárias**
  - Contratos (schemas)
  - Regras de negócio
  - Cenários de erro

### 3. Considerações Técnicas
- **Performance**
  - Timeouts necessários
  - Retry patterns
  - Rate limiting

- **Isolamento**
  - Limpeza de dados
  - Estado inicial
  - Rollback necessário

## Chain of Thought (COT)

### 1. Análise do Endpoint
```gherkin
Pensamento: "Para automatizar este endpoint, preciso:"
└── Identificar o método HTTP
    └── Entender os parâmetros necessários
        └── Verificar dependências de outros endpoints
            └── Definir ordem de execução
```

### 2. Definição de Cenários
```gherkin
Pensamento: "Para cobrir este endpoint, preciso testar:"
└── Caminho feliz
    └── Validações de contrato
        └── Cenários de erro
            └── Regras de negócio específicas
```

### 3. Implementação
```gherkin
Pensamento: "Para implementar os testes, vou:"
└── Criar schemas necessários
    └── Implementar requests
        └── Definir steps reutilizáveis
            └── Criar cenários BDD
```

### 4. Validação e Confirmação
```gherkin
Pensamento: "Para garantir a qualidade, preciso:"
└── **CONFIRMAR PLANO COM O USUÁRIO**
    └── Validar independência dos testes
        └── Verificar limpeza de dados
            └── Confirmar cobertura de cenários
                └── Testar em diferentes ambientes
```

## ⚠️ REGRA FUNDAMENTAL: Confirmação do Plano

**SEMPRE antes de executar qualquer automação:**

### 1. Apresentar o Plano Completo
```markdown
📋 **PLANO DE EXECUÇÃO**

**Estrutura que será criada:**
```
cypress/e2e/features/
├── get-products.feature      # Cenários: busca, filtros, paginação
├── post-products.feature     # Cenários: criação, validações
└── put-products-id.feature   # Cenários: atualização

cypress/support/
├── schemas/products-schemas.js
├── requests/productRequests.js
└── step_definitions/products.js
```

**Cenários que serão implementados:**
- GET /products: busca com sucesso, filtros, erro 401
- POST /products: criação válida, dados inválidos, erro 422
- PUT /products/{id}: atualização válida, ID inexistente
```

### 2. Perguntar Explicitamente
```
🤔 **CONFIRMAÇÃO NECESSÁRIA**

Você gostaria de alterar algo neste plano antes de eu executar?

Exemplos de alterações:
✏️ Adicionar/remover cenários específicos
📁 Modificar estrutura de arquivos  
🔍 Incluir validações adicionais
📋 Ajustar nomenclaturas
```

### 3. Aguardar Confirmação
- ✅ **SIM** → Proceder com implementação
- ❌ **NÃO** → Aguardar ajustes solicitados

## Exemplo de Uso

1. **Coleta Inicial**
```gherkin
Dado que preciso automatizar uma API de Produtos
Quando analiso as informações necessárias
Então devo coletar:
  | Informação     | Exemplo                    |
  | -------------- | -------------------------- |
  | Swagger        | http://api.example/swagger |
  | Autenticação   | Bearer Token              |
  | Ambiente       | https://qa.api.example     |
  | Dados Base     | Produtos para teste        |
```

2. **Análise e Planejamento**
```gherkin
Dado que tenho as informações básicas
Quando planejo a automação
Então devo definir:
  - Endpoints prioritários
  - Dependências entre endpoints
  - Schemas necessários
  - Cenários de teste
```

3. **Implementação**
```gherkin
Dado que tenho o planejamento
Quando início a implementação
Então devo seguir a sequência:
  1. Criar schemas
  2. Implementar requests
  3. Criar steps
  4. Definir cenários
```
