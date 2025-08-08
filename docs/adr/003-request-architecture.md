# ADR-003: Arquitetura de Requisições

## Status
Aceito

## Contexto
Precisávamos de uma estrutura para requisições HTTP que:
- Fosse fácil de manter e estender
- Permitisse reutilização de código
- Mantivesse a consistência nas chamadas
- Centralizasse configurações comuns

## Decisão
Implementamos uma arquitetura simplificada para requisições:

1. **Classe Base (Requests)**
   - Métodos HTTP básicos (GET, POST, PUT, DELETE, PATCH)
   - Gestão centralizada de headers
   - Configurações padrão
   ```javascript
   class Requests {
     static get(endpoint, params = {}) { ... }
     static post(endpoint, body = {}, params = {}) { ... }
     // ...
   }
   ```

2. **Classes de Domínio**
   - Importam e usam a classe base
   - Implementam endpoints específicos
   - Encapsulam lógica de negócio
   ```javascript
   class TodoRequests {
     static getTodo(id) { 
       return Requests.get(`${this.baseUrl}/todos/${id}`);
     }
   }
   ```

3. **Steps Diretos**
   - Usam as classes de domínio diretamente
   - Sem camada extra de abstração
   - Manutenção simplificada

## Consequências

### Positivas
- Código mais organizado e manutenível
- Reutilização de configurações
- Facilidade para adicionar novos endpoints
- Padronização das chamadas

### Negativas
- Mais arquivos para manter
- Necessidade de manter documentação atualizada
- Overhead inicial na criação de novas classes
