# Padrão de Implementação de Requests

## Estrutura Obrigatória

### 1. Classe de Request Base
Todas as requests específicas DEVEM usar a classe `Requests` como base:

```javascript
import Requests from './requests';

class [Domain]Requests {
    static baseUrl = Cypress.env('API_BASE_URL') || '/default-path';

    static [methodName](options = {}) {
        // Implementação usando Requests.get(), Requests.post(), etc.
        return Requests.get(url, options);
    }
}

export default [Domain]Requests;
```

### 2. Exemplo Completo - MemberRequests

```javascript
import Requests from './requests';

class MemberRequests {
    static baseUrl = Cypress.env('API_BASE_URL') || '/reference-data/api/b3/v1';

    /**
     * GET /member-link
     * @param {Object} options - Query parameters e request options
     * @param {string} options.memberLinkId - ID do member link
     * @returns {Cypress.Chainable} Response da requisição
     */
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

    /**
     * GET /member-link/detail
     * @param {Object} options - Query parameters e request options
     * @param {string} options.memberLinkId - ID obrigatório do member link
     * @param {string} options.bookmark - Bookmark para paginação
     * @returns {Cypress.Chainable} Response da requisição
     */
    static getMemberLinksDetails(options = {}) {
        const { memberLinkId, bookmark, ...requestOptions } = options;
        
        if (!memberLinkId) {
            throw new Error('memberLinkId é obrigatório para getMemberLinksDetails');
        }
        
        let url = `${this.baseUrl}/member-link/detail?memberLinkId=${memberLinkId}`;
        
        if (bookmark) {
            url += `&bookmark=${bookmark}`;
        }

        return Requests.get(url, {
            failOnStatusCode: false,
            ...requestOptions
        });
    }
}

export default MemberRequests;
```

### 3. Importação nos Step Definitions

```javascript
import MemberRequests from '../../support/requests/memberRequests';

// Uso:
MemberRequests.getMemberLinks()
MemberRequests.getMemberLinksDetails({ memberLinkId: '123' })
```

## Benefícios desta Abordagem

1. **Centralização de Headers**: Todos os headers são gerenciados pela classe `Requests`
2. **Reutilização**: Métodos HTTP padronizados (get, post, put, delete)
3. **Flexibilidade**: Permite override de qualquer configuração via `options`
4. **Manutenibilidade**: Mudanças na base afetam todas as requests automaticamente

## Padrões de Nomenclatura

### Arquivos
- `[domain]Requests.js` (ex: `memberRequests.js`, `userRequests.js`)

### Classes
- `[Domain]Requests` (ex: `MemberRequests`, `UserRequests`)

### Métodos
- `get[Resource]()` (ex: `getMemberLinks()`, `getUsers()`)
- `get[Resource]By[Criteria]()` (ex: `getMemberLinksDetails()`, `getUserById()`)
- `create[Resource]()` (ex: `createMember()`, `createUser()`)
- `update[Resource]()` (ex: `updateMember()`, `updateUser()`)
- `delete[Resource]()` (ex: `deleteMember()`, `deleteUser()`)

## Checklist de Implementação

- [ ] Importa `Requests` da classe base
- [ ] Usa métodos estáticos
- [ ] Define `baseUrl` como propriedade estática
- [ ] Extrai query parameters do objeto `options`
- [ ] Inclui `failOnStatusCode: false` quando apropriado
- [ ] Documenta parâmetros com JSDoc
- [ ] Exporta com `export default`
- [ ] Valida parâmetros obrigatórios quando necessário
