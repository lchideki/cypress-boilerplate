# ADR-001: Uso do Cucumber para BDD

## Status
Aceito

## Contexto
Precisávamos de uma abordagem que:
- Facilitasse a comunicação entre equipes técnicas e não técnicas
- Permitisse documentação viva dos testes
- Suportasse reutilização de steps
- Mantivesse os testes organizados e legíveis

## Decisão
Decidimos usar Cucumber com Cypress através do plugin @badeball/cypress-cucumber-preprocessor porque:

1. **Gherkin Syntax**
   - Linguagem natural e estruturada
   - Facilita entendimento por stakeholders não técnicos
   - Documentação e especificação em um só lugar

2. **Integração com Cypress**
   - Plugin maduro e bem mantido
   - Suporte a TypeScript
   - Boa performance na execução

3. **Organização**
   - Separação clara entre especificação (.feature) e implementação (step definitions)
   - Suporte a tags para organização dos testes
   - Reuso de steps entre cenários

## Consequências

### Positivas
- Melhor comunicação entre equipes
- Documentação sempre atualizada
- Código mais organizado e reutilizável
- Facilidade em manter e escalar testes

### Negativas
- Curva de aprendizado inicial para Gherkin
- Overhead de configuração do preprocessor
- Necessidade de manter step definitions organizadas
