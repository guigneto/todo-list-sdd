# 🏗️ Arquitetura

Visão geral da arquitetura da aplicação TODO List.

## 📐 Padrão MVC

A aplicação segue o padrão **Model-View-Controller** com uma camada extra de Services entre Controllers e Models:

```mermaid
flowchart TD
    V["<b>React Components (View)</b><br/>TaskListPage · TaskItem · TaskForm · TaskList<br/><i>Renderização e interação do usuário</i>"]
    C["<b>Controllers (Orquestração)</b><br/>TaskController · ReminderController<br/><i>Coordenam View ↔ Services</i>"]
    S["<b>Services (Lógica de Negócio)</b><br/>TaskService · ReminderService · StorageService · NotificationService<br/><i>Regras de negócio e persistência</i>"]
    M["<b>Models (Entidades)</b><br/>TaskModel · ReminderModel<br/><i>Dados e validações</i>"]
    DB[("<b>localStorage</b><br/><i>Persistência no navegador</i>")]

    V -- chamam --> C
    C -- utilizam --> S
    S -- utilizam --> M
    M -- persistem --> DB

    classDef view fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e3a8a;
    classDef ctrl fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#78350f;
    classDef svc fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#14532d;
    classDef model fill:#fce7f3,stroke:#db2777,stroke-width:2px,color:#831843;
    classDef storage fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px,color:#312e81;

    class V view;
    class C ctrl;
    class S svc;
    class M model;
    class DB storage;
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

```mermaid
sequenceDiagram
    autonumber
    participant U as Usuário
    participant F as TaskForm
    participant P as TaskListPage
    participant C as TaskController
    participant S as TaskService
    participant M as TaskModel
    participant ST as StorageService
    participant N as NotificationService

    U->>F: Preenche título e descrição
    F->>P: onChange / submit
    P->>C: criarTarefa(dados)
    C->>S: criarTarefa(dados)
    S->>M: validar()
    M-->>S: ok
    S->>ST: set(tarefas) → localStorage
    S->>N: notify("Tarefa criada")
    S-->>P: onTasksChanged
    P-->>F: setTasks() (re-render)
    F-->>U: Lista atualizada
```

### Deleção de Tarefa

```mermaid
sequenceDiagram
    autonumber
    participant U as Usuário
    participant I as TaskItem
    participant P as TaskListPage
    participant Mo as DeleteConfirmationModal
    participant C as TaskController
    participant S as TaskService
    participant ST as StorageService
    participant N as NotificationService

    U->>I: Clica no ícone de deletar
    I->>P: onDelete(task)
    P->>Mo: abre modal de confirmação
    U->>Mo: Confirmar deleção
    Mo->>P: handleConfirmDelete()
    P->>C: deletarTarefa(id)
    C->>S: deletarTarefa(id)
    S->>ST: set(tarefas) → localStorage
    S->>N: notifyTaskDeleted()
    S-->>P: onTasksChanged
    P-->>U: Tarefa desaparece da lista
```

## 🔌 Integração de Componentes

### TaskListPage (Container Principal)

```mermaid
flowchart TD
    P[TaskListPage]
    P --> F[TaskForm<br/><i>Entrada de dados</i>]
    P --> L[TaskList<br/><i>Renderização da lista</i>]
    L --> I[TaskItem<br/><i>Item individual</i>]
    P --> D[DeleteConfirmationModal<br/><i>Confirmação de deleção</i>]
    P --> T[Toast<br/><i>Notificações</i>]

    classDef container fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e3a8a;
    classDef child fill:#f1f5f9,stroke:#475569,stroke-width:1.5px,color:#0f172a;
    class P container;
    class F,L,I,D,T child;
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

Para mais detalhes, consulte a [🔧 Estrutura do Projeto](../development/project-structure.md).
