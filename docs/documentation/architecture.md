# 🏗️ Arquitetura

Visão geral da arquitetura da aplicação TODO List.

## 📐 Padrão MVC

A aplicação segue o padrão **Model-View-Controller**:

```
┌─────────────────────────────────────────────────────────┐
│              React Components (View)                      │
│  - TaskListPage, TaskItem, TaskForm, TaskList, etc      │
│  - Responsável por renderização e interação do usuário  │
└──────────────────────────┬──────────────────────────────┘
                           │ (chamam)
┌──────────────────────────▼──────────────────────────────┐
│           Controllers (Orquestração)                     │
│  - TaskController, ReminderController                   │
│  - Coordenam operações entre View e Services            │
└──────────────────────────┬──────────────────────────────┘
                           │ (utilizam)
┌──────────────────────────▼──────────────────────────────┐
│         Services (Lógica de Negócio)                     │
│  - TaskService, ReminderService, StorageService, etc   │
│  - Implementam regras de negócio e persistência         │
└──────────────────────────┬──────────────────────────────┘
                           │ (utilizam)
┌──────────────────────────▼──────────────────────────────┐
│          Models (Entidades)                              │
│  - TaskModel, ReminderModel                             │
│  - Encapsulam dados e validações                        │
└──────────────────────────┬──────────────────────────────┘
                           │ (persistem)
┌──────────────────────────▼──────────────────────────────┐
│       localStorage (Persistência)                        │
│  - Armazenamento em memória do navegador                │
└─────────────────────────────────────────────────────────┘
```

## 📁 Estrutura de Diretórios

```
todo-list-sdd/
├── src/
│   ├── components/           # Componentes React (View)
│   │   ├── TaskListPage.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskForm.tsx
│   │   ├── DeleteConfirmationModal.tsx
│   │   ├── Toast.tsx
│   │   └── *.css
│   │
│   ├── controllers/          # Controladores (Orquestração)
│   │   └── TaskController.ts
│   │
│   ├── services/             # Serviços (Lógica de Negócio)
│   │   ├── TaskService.ts
│   │   ├── ReminderService.ts
│   │   ├── StorageService.ts
│   │   ├── NotificationService.ts
│   │   ├── ValidationService.ts
│   │   └── DateService.ts
│   │
│   ├── models/               # Modelos (Entidades)
│   │   ├── Task.ts
│   │   └── Reminder.ts
│   │
│   ├── types/                # TypeScript Interfaces
│   │   ├── Task.ts
│   │   └── Reminder.ts
│   │
│   ├── constants/            # Constantes e Configurações
│   │   ├── messages.ts       # Mensagens pt-BR
│   │   └── config.ts         # Configurações da app
│   │
│   ├── utils/                # Utilitários
│   │   ├── dateUtils.ts
│   │   └── stringUtils.ts
│   │
│   ├── App.tsx               # Componente raiz
│   ├── main.tsx              # Entrada React
│   └── index.css             # Estilos globais
│
├── tests/
│   ├── unit/                 # Testes Unitários
│   │   ├── models/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── integration/          # Testes de Integração
│   │   └── task-flow.test.ts
│   │
│   └── e2e/                  # Testes E2E (Playwright)
│       └── task-management.spec.ts
│
├── docs/                     # Documentação
├── .github/
│   └── workflows/            # CI/CD
│       ├── test.yml
│       └── deploy.yml
│
├── public/                   # Arquivos estáticos
├── dist/                     # Build de produção
│
├── index.html                # HTML entry point
├── package.json              # Dependências
├── tsconfig.json             # Configuração TypeScript
├── vite.config.ts            # Configuração Vite
├── mkdocs.yml                # Documentação MkDocs
└── README.md                 # Documentação principal
```

## 🔄 Fluxo de Dados

### Criação de Tarefa

```
User Input (TaskForm)
        ↓
    onChange event
        ↓
TaskListPage (state)
        ↓
handleCreateTask()
        ↓
TaskController.criarTarefa()
        ↓
TaskService.criarTarefa()
        ↓
TaskModel.validar() ✓
        ↓
StorageService.set() → localStorage
        ↓
NotificationService.notify() (Toast)
        ↓
callback onTasksChanged
        ↓
TaskListPage.setTasks() (re-render)
        ↓
TaskList atualiza UI
```

### Deleção de Tarefa

```
User Click (delete button)
        ↓
TaskItem.onDelete()
        ↓
TaskListPage (setSelectedTaskForDelete)
        ↓
DeleteConfirmationModal.isOpen = true
        ↓
User Confirm Delete
        ↓
TaskListPage.handleConfirmDelete()
        ↓
TaskController.deletarTarefa()
        ↓
TaskService.deletarTarefa()
        ↓
StorageService.set() → localStorage
        ↓
NotificationService.notifyTaskDeleted() (Toast)
        ↓
callback onTasksChanged
        ↓
TaskListPage.setTasks() (re-render)
        ↓
Task desaparece da lista UI
```

## 🔌 Integração de Componentes

### TaskListPage (Container Principal)

```typescript
<TaskListPage>
  ├── TaskForm          // Entrada de dados
  ├── TaskList          // Renderização da lista
  │   └── TaskItem[] // Items individuais
  ├── DeleteConfirmationModal  // Confirmação de deleção
  └── Toast             // Notificações
```

## 💾 Persistência

- **Armazenamento:** localStorage (browser API)
- **Prefixo:** `todo-list-`
- **Chaves:** `tasks`, `reminders`, etc.
- **Formato:** JSON serializado
- **Limite:** ~5-10 MB por domínio (varia por navegador)

### Exemplo de Dados Persistidos

```json
{
  "todo-list-tasks": [
    {
      "id": "abc123...",
      "titulo": "Estudar React",
      "descricao": "Componentes, hooks e state",
      "status": "pendente",
      "criada_em": "2026-05-10T21:29:42.657Z"
    }
  ]
}
```

## 🔐 Segurança

- ✅ **XSS Prevention:** Sanitização de inputs
- ✅ **Input Validation:** Validação rigorosa de tipos (TypeScript)
- ✅ **No Backend Exposure:** Dados apenas no cliente
- ⚠️ **localStorage:** Não use dados sensíveis (senhas, tokens)

## 📈 Performance

- **Bundle Size:** ~50 KB gzipped
- **Build Time:** ~1 segundo
- **Load Time:** < 2 segundos (com cache)
- **FCP (First Contentful Paint):** ~600ms

## 🚀 Escalabilidade Futura

### Possíveis Evoluções:

1. **Backend API**
   - Express/Node.js ou serverless
   - Sincronização em tempo real
   - Multi-device sync

2. **Database**
   - PostgreSQL/MongoDB
   - Backup automático
   - Histórico de versões

3. **Autenticação**
   - Login com email/senha
   - OAuth (Google, GitHub)
   - Autosync entre dispositivos

4. **Features Avançadas**
   - Colaboração em tempo real
   - Lembretes por SMS/Email
   - Integração com calendário
   - Mobile app (PWA/Native)

---

Para mais detalhes, consulte a [🔧 Estrutura do Projeto](development/project-structure.md).
