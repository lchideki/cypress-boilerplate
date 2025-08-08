# ADR-002: Escolha do Joi para Validação de Schemas

## Status
Aceito

## Contexto
Necessitávamos de uma solução robusta para validação de schemas de API que:
- Fosse fácil de usar e manter
- Oferecesse mensagens de erro claras
- Permitisse reuso de schemas
- Suportasse validações complexas

## Decisão
Escolhemos Joi como nossa biblioteca de validação de schemas pelos seguintes motivos:

1. **API Declarativa**
   - Sintaxe clara e intuitiva
   - Fácil de ler e manter
   - Boa documentação

2. **Recursos Avançados**
   - Validações condicionais
   - Composição de schemas
   - Validações customizadas
   - Suporte a tipos complexos

3. **Mensagens de Erro**
   - Mensagens detalhadas e úteis
   - Customização de mensagens
   - Localização de erros precisos

4. **Maturidade**
   - Biblioteca amplamente testada
   - Grande comunidade
   - Bem mantida

## Consequências

### Positivas
- Código de validação mais limpo e manutenível
- Melhor feedback em falhas de teste
- Facilidade em criar e reutilizar schemas
- Suporte a casos complexos de validação

### Negativas
- Mais uma dependência no projeto
- Pequeno overhead de performance
- Necessidade de aprendizado da API do Joi
