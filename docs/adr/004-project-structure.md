# ADR-004: Estrutura do Projeto

## Status
Aceito

## Contexto
Necessitávamos de uma estrutura de projeto que:
- Fosse escalável
- Mantivesse o código organizado
- Facilitasse a manutenção
- Seguisse boas práticas de automação

## Decisão
Implementamos uma estrutura organizada por responsabilidades:

1. **Testes e Steps (cypress/e2e/)**
   ```
   e2e/
   ├── features/        # Arquivos .feature (BDD)
   └── step_definitions/# Implementações dos steps
   ```
   - Separação clara entre especificação e implementação
   - Organização por domínio
   - Facilita manutenção

2. **Suporte (cypress/support/)**
   ```
   support/
   ├── requests/       # Classes de requisição
   ├── schemas/        # Schemas Joi
   ├── commands.js     # Comandos customizados
   └── e2e.js         # Configurações globais
   ```
   - Código reutilizável
   - Configurações centralizadas
   - Fácil de estender

3. **Documentação (docs/)**
   ```
   docs/
   ├── adr/           # Decisões arquiteturais
   ├── patterns/      # Padrões e guias
   └── setup/         # Guias de configuração
   ```
   - Documentação viva
   - Padrões claros
   - Fácil onboarding

## Consequências

### Positivas
- Código organizado e fácil de encontrar
- Separação clara de responsabilidades
- Facilidade de manutenção
- Documentação integrada ao código

### Negativas
- Estrutura mais complexa
- Necessidade de manter documentação
- Curva de aprendizado inicial para novos membros
