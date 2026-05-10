# Plano de Implementação: Gerenciamento de Tarefas com Lembretes

**Branch**: `002-task-management` | **Data**: 2026-05-10 | **Especificação**: [spec.md](./spec.md)  
**Input**: Especificação de funcionalidade de `/specs/002-task-management/spec.md`

## Resumo

Esta funcionalidade adiciona capacidades essenciais de gerenciamento de tarefas: permitir que usuários deletem tarefas e definam lembretes com notificações. O sistema deve ser deployado em plataforma gratuita (GitHub Pages ou Vercel), seguindo padrão MVC, em mono-repo, com armazenamento em memória apenas, e 100% em português-brasileiro.

## Contexto Técnico

**Linguagem/Versão**: TypeScript 5.x + Node.js 18+ ou equivalente (PRECISA DE CLARIFICAÇÃO - decidir entre Node, Python, ou framework web)  
**Dependências Primárias**: React (frontend) ou framework SPA equivalente; Express ou framework leve (backend se necessário)  
**Armazenamento**: Memória em processo (localStorage para persistência entre sessões, sem banco de dados externo)  
**Testes**: Jest/Vitest (unit), Playwright/Cypress (integration), sem testes de banco de dados  
**Plataforma Alvo**: Browser web (Chrome, Firefox, Safari, Edge); deploy em Vercel ou GitHub Pages  
**Tipo de Projeto**: Aplicação web (SPA + API backend opcional)  
**Objetivos de Performance**: UI responsiva em <200ms, notificações de lembrete em <2 segundos  
**Restrições**: Sem backend persistente, sem banco de dados externo, aplicação stateless em produção, reset completo ao reiniciar  
**Escala/Escopo**: Suportar até 100 tarefas + 100 lembretes simultâneos, 1 usuário por sessão

## Verificação da Constituição

*GATE: Deve passar antes de Phase 0. Re-verificar após Phase 1.*

### Conformidade com Princípios

✅ **I. Documentation-First**: Documentação em pt-BR como requisito constitucional  
✅ **II. Clean Code**: Linting enforced, code review gates, DRY principle  
✅ **III. Deployment**: Deployment automático em free tier (Vercel/GitHub Pages), CI/CD via GitHub Actions  
✅ **IV. Version Control**: Feature branch `002-task-management`, commits em pt-BR, PR review required  
✅ **V. Documentation (MKDOCS)**: Docs em pt-BR, exemplos de uso, API reference  

### Conformidade com Arquitetura

✅ **MVC Obrigatório**:
- **Models**: Lógica de negócio, independentes da UI
- **Views**: Componentes responsáveis apenas por apresentação
- **Controllers**: Orquestradores entre Models e Views

✅ **Mono-repo**: Estrutura única em `src/` com separação lógica  
✅ **Armazenamento em Memória**: localStorage para persistência entre sessões, sem banco externo  
✅ **Localização pt-BR**: Todas as mensagens, UI, comentários em português-brasileiro  
✅ **Deployment Free-tier**: Estrutura compatível com Vercel e GitHub Pages

### Resultado: ✅ NENHUMA VIOLAÇÃO

---

## Estrutura de Projeto

### Documentação (esta funcionalidade)

```text
specs/002-task-management/
├── plan.md                          # Este arquivo (saída do /speckit.plan)
├── research.md                      # Phase 0 (a gerar)
├── data-model.md                    # Phase 1 (a gerar)
├── quickstart.md                    # Phase 1 (a gerar)
├── contracts/                       # Phase 1 (a gerar)
│   └── task-api-contract.md         # Especificação da API
├── spec.md                          # Especificação original
└── checklists/
    └── requirements.md              # Checklist de qualidade
```

### Código-Fonte (raiz do repositório) - Mono-repo MVC

```text
src/
├── models/
│   ├── Task.ts                      # Entidade Task
│   ├── Reminder.ts                  # Entidade Reminder
│   ├── TaskService.ts               # Serviço de lógica de tarefas
│   └── ReminderService.ts           # Serviço de lógica de lembretes
│
├── controllers/
│   ├── TaskController.ts            # Orquestrador de operações de tarefas
│   ├── ReminderController.ts        # Orquestrador de lembretes
│   └── NotificationController.ts    # Orquestrador de notificações
│
├── components/                      # View layer - React components
│   ├── TaskList.tsx                 # Componente de lista de tarefas
│   ├── TaskItem.tsx                 # Item individual
│   ├── TaskForm.tsx                 # Formulário de edição
│   ├── ReminderModal.tsx            # Modal para definir lembretes
│   └── Notification.tsx             # Componente de notificação
│
├── services/
│   ├── StorageService.ts            # Gerenciamento localStorage
│   ├── NotificationService.ts       # Disparo de notificações
│   ├── DateService.ts               # Formatação de datas (pt-BR)
│   └── ValidationService.ts         # Validação de dados
│
├── constants/
│   ├── messages.ts                  # Mensagens em pt-BR (centralizadas)
│   ├── validationRules.ts           # Regras de validação
│   └── config.ts                    # Configurações da aplicação
│
├── types/
│   ├── Task.ts                      # Type definitions
│   ├── Reminder.ts                  # Type definitions
│   └── index.ts                     # Exports centralizados
│
├── utils/
│   ├── dateUtils.ts                 # Utilidades de datas
│   ├── stringUtils.ts               # Utilidades de strings
│   └── storageUtils.ts              # Utilidades de storage
│
└── index.tsx                        # Entry point

tests/
├── unit/
│   ├── models/
│   │   ├── Task.test.ts             # Testes unitários
│   │   └── Reminder.test.ts         # Testes unitários
│   └── services/
│       └── TaskService.test.ts      # Testes de serviços
│
├── integration/
│   ├── task-deletion.test.ts        # Teste de deleção
│   ├── reminder-notification.test.ts # Teste de lembretes
│   └── full-workflow.test.ts        # Teste completo
│
└── e2e/
    └── task-management.spec.ts      # Testes end-to-end

docs/
├── CONTRIBUTING.md                  # Guia de contribuição (pt-BR)
├── API.md                           # Referência API (pt-BR)
└── DEPLOYMENT.md                    # Guia de deployment (pt-BR)

.github/workflows/
├── test.yml                         # CI/CD para testes
└── deploy.yml                       # CI/CD para deploy Vercel/Pages

package.json                         # Dependências
tsconfig.json                        # Configuração TypeScript
vite.config.ts                       # Build config (Vite)
.env.example                         # Template variáveis
```

**Decisão de Estrutura**: Mono-repo com padrão MVC, SPA (React/TypeScript), sem backend persistente. Models encapsulam lógica de negócio, Controllers orquestram, Components renderizam UI. localStorage para persistência. Deploy em Vercel ou GitHub Pages.

---

## Phase 0: Pesquisa

### Incógnitas a Resolver (PRECISA DE CLARIFICAÇÃO)

1. Qual framework frontend? (React, Vue, Svelte)
2. TypeScript obrigatório ou JavaScript puro?
3. Qual sistema de notificação? (Notification API vs UI toast)
4. Deploy priority: Vercel ou GitHub Pages?
5. Build tool: Vite, Webpack, ou equivalente?

### Tarefas de Pesquisa

- T-001: MVC patterns em TypeScript/JavaScript moderno
- T-002: localStorage vs IndexedDB para este caso de uso
- T-003: Deploy de SPAs em Vercel e GitHub Pages
- T-004: Internacionalização pt-BR em JavaScript
- T-005: Browser Notification API vs toast libraries
- T-006: Limites de localStorage e alternativas

---

## Phase 1: Design & Contratos (a executar)

### Saídas esperadas

- `research.md`: Consolidação de achados de Phase 0
- `data-model.md`: Modelos de dados completos
- `contracts/task-api-contract.md`: Contratos de interface
- `quickstart.md`: Guia de início rápido

---

## Rastreamento de Complexidade

✅ **Nenhuma violação de constituição** - arquitetura MVC, mono-repo, memória, pt-BR, deployment free-tier.

---

**Version**: 1.0.0 | **Status**: Pronto para Phase 0 Pesquisa | **Última Atualização**: 2026-05-10
