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

### 4. Validação
```gherkin
Pensamento: "Para garantir a qualidade, preciso:"
└── Validar independência dos testes
    └── Verificar limpeza de dados
        └── Confirmar cobertura de cenários
            └── Testar em diferentes ambientes
```

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
