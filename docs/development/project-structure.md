# 📁 Estrutura do Projeto

Visão geral completa da organização do projeto TODO List.

## 📂 Estrutura de Diretórios

```
todo-list-sdd/
│
├── 📁 src/                          # Código-fonte da aplicação
│   │
│   ├── 📁 components/               # Componentes React (View)
│   │   ├── TaskListPage.tsx         # Página principal com container
│   │   ├── TaskListPage.css
│   │   ├── TaskList.tsx             # Lista de tarefas com filtros
│   │   ├── TaskList.css
│   │   ├── TaskItem.tsx             # Item individual de tarefa
│   │   ├── TaskItem.css
│   │   ├── TaskForm.tsx             # Formulário para criar tarefa
│   │   ├── TaskForm.css
│   │   ├── DeleteConfirmationModal.tsx  # Modal de confirmação
│   │   ├── Modal.css
│   │   ├── Toast.tsx                # Notificações
│   │   └── Toast.css
│   │
│   ├── 📁 controllers/              # Controllers (Orquestração)
│   │   └── TaskController.ts        # Coordena Task operations
│   │
│   ├── 📁 services/                 # Services (Lógica de Negócio)
│   │   ├── TaskService.ts           # CRUD de tarefas
│   │   ├── ReminderService.ts       # Gerenciamento de lembretes
│   │   ├── StorageService.ts        # Abstração localStorage
│   │   ├── NotificationService.ts   # Browser notifications
│   │   ├── ValidationService.ts     # Validações
│   │   └── DateService.ts           # Formatação de datas
│   │
│   ├── 📁 models/                   # Models (Entidades)
│   │   ├── Task.ts                  # Task model com validação
│   │   └── Reminder.ts              # Reminder model
│   │
│   ├── 📁 types/                    # TypeScript Types/Interfaces
│   │   ├── Task.ts                  # Task interface
│   │   └── Reminder.ts              # Reminder interface
│   │
│   ├── 📁 constants/                # Constantes da Aplicação
│   │   ├── messages.ts              # Mensagens pt-BR
│   │   └── config.ts                # Configurações globais
│   │
│   ├── 📁 utils/                    # Utilitários
│   │   ├── dateUtils.ts             # Funções de data
│   │   └── stringUtils.ts           # Funções de string
│   │
│   ├── App.tsx                      # Componente raiz da aplicação
│   ├── main.tsx                     # Entry point React
│   └── index.css                    # Estilos globais
│
├── 📁 tests/                        # Testes
│   │
│   ├── 📁 unit/                     # Testes Unitários
│   │   ├── 📁 models/
│   │   │   ├── Task.test.ts
│   │   │   └── Reminder.test.ts
│   │   │
│   │   ├── 📁 services/
│   │   │   ├── TaskService.test.ts
│   │   │   ├── StorageService.test.ts
│   │   │   └── ValidationService.test.ts
│   │   │
│   │   └── 📁 utils/
│   │       ├── dateUtils.test.ts
│   │       └── stringUtils.test.ts
│   │
│   ├── 📁 integration/              # Testes de Integração
│   │   ├── task-flow.test.ts        # Fluxo completo de tarefa
│   │   └── reminder-flow.test.ts    # Fluxo de lembretes
│   │
│   └── 📁 e2e/                      # Testes E2E (Playwright)
│       ├── task-management.spec.ts
│       └── reminders.spec.ts
│
├── 📁 docs/                         # Documentação MkDocs
│   │
│   ├── index.md                     # Home da documentação
│   ├── quickstart.md                # Guia de início rápido
│   ├── changelog.md                 # Histórico de versões
│   ├── faq.md                       # Dúvidas frequentes
│   │
│   ├── 📁 documentation/
│   │   ├── architecture.md          # Arquitetura e padrões
│   │   ├── api.md                   # Referência de API
│   │   ├── user-guide.md            # Guia do usuário
│   │   └── configuration.md         # Configuração
│   │
│   ├── 📁 deployment/
│   │   ├── github-pages.md          # Deploy GitHub Pages
│   │   ├── vercel.md                # Deploy Vercel
│   │   └── troubleshooting.md       # Troubleshooting
│   │
│   └── 📁 development/
│       ├── setup.md                 # Setup local
│       ├── project-structure.md     # Estrutura do projeto
│       ├── testing.md               # Guia de testes
│       └── contributing.md          # Como contribuir
│
├── 📁 .github/
│   │
│   ├── 📁 workflows/                # GitHub Actions
│   │   ├── test.yml                 # CI: Testes e linting
│   │   ├── deploy.yml               # Deploy para GitHub Pages
│   │   ├── docs.yml                 # Deploy MkDocs
│   │   └── codeql-analysis.yml      # Análise de segurança
│   │
│   ├── 📁 issue_template/           # Templates de issue
│   ├── 📁 pull_request_template/    # Templates de PR
│   └── copilot-instructions.md      # Instruções Copilot
│
├── 📁 public/                       # Arquivos estáticos
│   └── favicon.ico
│
├── 📁 dist/                         # Build de produção (gerado)
│
├── 📁 site/                         # Documentação compilada (gerado)
│
├── 📁 node_modules/                 # Dependências (não commitar)
│
├── 📄 index.html                    # HTML entry point
├── 📄 package.json                  # Dependências npm
├── 📄 package-lock.json             # Lock file
├── 📄 tsconfig.json                 # Configuração TypeScript
├── 📄 vite.config.ts                # Configuração Vite
├── 📄 mkdocs.yml                    # Configuração MkDocs
├── 📄 .eslintrc.json                # Configuração ESLint
├── 📄 prettier.config.js            # Configuração Prettier
├── 📄 .env.example                  # Variáveis de ambiente
├── 📄 .gitignore                    # Git ignore patterns
├── 📄 .prettierignore               # Prettier ignore
├── 📄 .eslintignore                 # ESLint ignore
├── 📄 vitest.config.ts              # Configuração Vitest
├── 📄 playwright.config.ts          # Configuração Playwright
├── 📄 README.md                     # Documentação principal
└── 📄 CONTRIBUTING.md               # Guia de contribuição
```

## 📊 Dependências por Camada

### View (React Components)
```
TaskListPage
├── TaskForm
├── TaskList
│   ├── TaskItem[]
│   └── (filters)
├── DeleteConfirmationModal
└── Toast
```

### Controllers
```
TaskController
├── TaskService (dependency)
├── NotificationService (dependency)
└── MENSAGENS (dependency)
```

### Services
```
TaskService
├── TaskModel (dependency)
├── StorageService (dependency)
└── ValidationService (dependency)

StorageService
└── Browser localStorage API

NotificationService
└── Browser Notification API

ValidationService
└── Regular Expressions

DateService
└── Intl API
```

### Models
```
TaskModel
└── ValidationService (dependency)

ReminderModel
└── DateService (dependency)
```

## 📝 Arquivos Importantes

### Configuração
- `tsconfig.json` - TypeScript strict mode, path aliases
- `vite.config.ts` - Build, dev server, aliases
- `mkdocs.yml` - Documentação MkDocs Material
- `.env.example` - Variáveis de ambiente

### Código
- `src/App.tsx` - Componente raiz
- `src/main.tsx` - React entry point
- `src/controllers/TaskController.ts` - Orquestração principal
- `src/services/TaskService.ts` - Lógica de negócio

### Testes
- `vitest.config.ts` - Configuração de testes unitários
- `playwright.config.ts` - Configuração de testes E2E

### CI/CD
- `.github/workflows/test.yml` - Testes automáticos
- `.github/workflows/deploy.yml` - Deploy GitHub Pages
- `.github/workflows/docs.yml` - Deploy MkDocs

## 🔄 Fluxo de Dados

```
Usuário (Browser UI)
        ↓
React Components (src/components/)
        ↓
Controllers (src/controllers/)
        ↓
Services (src/services/)
        ↓
Models (src/models/)
        ↓
localStorage (persistência)
```

## 📦 Bundling

Arquivos entram em build Vite:

```
src/**/*.(ts|tsx)
        ↓
TypeScript Compiler
        ↓
React JSX Transform
        ↓
Vite Bundle Optimizer
        ↓
dist/assets/index-*.js (158 KB)
dist/assets/index-*.css (8.5 KB)
dist/index.html
```

**Saída:** ~50 KB gzipped, pronto para produção

## 🧪 Teste Layers

```
Unit Tests (vitest)
├── Models testing
├── Services testing
└── Utils testing

Integration Tests (vitest)
├── Service interactions
└── Flow testing

E2E Tests (Playwright)
├── Full user workflows
└── Browser automation
```

## 📚 Documentação

```
mkdocs.yml (config)
    ↓
docs/**/*.md (markdown files)
    ↓
mkdocs build
    ↓
site/ (HTML estático)
    ↓
GitHub Pages deploy
```

## 🚀 Deployment

```
src/ + tests/
    ↓
npm run build
    ↓
dist/ (production ready)
    ↓
GitHub Pages / Vercel
    ↓
https://seu-usuario.github.io/todo-list-sdd
```

## 🔐 Git Structure

```
main (production)
    ↓
feature/* (development branches)
    ↓
Pull Request
    ↓
Code Review
    ↓
Merge to main
    ↓
CI/CD Deploy
```

---

Para explorar qualquer diretório em detalhe, consulte documentação específica em [📖 Documentação](../documentation/architecture.md).
