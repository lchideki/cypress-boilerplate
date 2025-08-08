# Cypress API Testing Framework

A comprehensive API testing framework built with Cypress, featuring structured documentation and AI-assisted testing capabilities.

## 🌟 Key Features

- **BDD Testing** with Cucumber integration
- **Schema Validation** using Joi
- **Organized Request Architecture**
- **AI-Assisted Testing** capabilities with detailed prompting guides

## 📁 Project Structure

```
├── cypress/
│   ├── e2e/                    # Test specifications
│   │   ├── features/          # Cucumber feature files
│   │   └── step_definitions/  # Step definitions
│   ├── support/               # Support files and utilities
│   │   ├── requests/         # API request handlers
│   │   └── schemas/          # Schema definitions
│   └── fixtures/             # Test data and fixtures
└── docs/                     # Comprehensive documentation
    ├── adr/                  # Architecture Decision Records
    ├── automation-guide/     # Detailed automation guides
    ├── patterns/            # Implementation patterns
    ├── prompts/             # AI prompting guidelines
    └── setup/               # Setup instructions
```

## 🤖 AI-Assisted Testing Support

This framework includes a dedicated `docs` directory that provides comprehensive guidance for AI-assisted testing:

- **Architecture Decision Records (ADRs)**
  - Contains all architectural decisions and their rationale
  - Helps understand the core project decisions

- **Automation Guide**
  - Complete automation instructions
  - Thought process frameworks (Skeleton of Thought/Chain of Thought)
  - Example scenarios and implementations

- **Prompt Engineering**
  - Structured prompt templates
  - Interaction guidelines for AI agents
  - Example prompts and use cases

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/lchideki/cypress-boilerplate.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run Cypress:
   ```bash
   # Open Cypress Test Runner
   npm run cypress:open

   # Run tests in headless mode
   npm run cypress:run
   ```

4. Review the documentation in the `/docs` folder:
   - Start with `/docs/setup/quick-start.md`
   - Review ADRs in `/docs/adr/`
   - Check automation guides in `/docs/automation-guide/`

## 📚 Documentation Structure

- **/docs/adr/**: Architecture decisions and rationale
- **/docs/automation-guide/**: Implementation guides and best practices
- **/docs/patterns/**: Coding standards and patterns
- **/docs/prompts/**: AI interaction guidelines and examples
- **/docs/setup/**: Project setup and configuration

## 🤝 Contributing

Feel free to contribute to this project. Please read through our documentation first, especially the ADRs and project standards.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
