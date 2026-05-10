# TODO List - Especificação de Design de Software

> Aplicação de gerenciamento de tarefas com lembretes e notificações. Construída com TypeScript, React e Vite para deployment em free tier (Vercel/GitHub Pages).

![Build Status](https://github.com/seu-username/todo-list-sdd/actions/workflows/test.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🎯 Características

- ✅ **Criar, listar e deletar tarefas** - Gerenciamento completo
- 🔔 **Lembretes com notificações** - Notificações do navegador
- 💾 **Persistência local** - Dados salvos em localStorage
- 🌐 **Sem backend** - Aplicação 100% frontend
- 🇧🇷 **100% PT-BR** - Interface e docs em português-brasileiro
- 📱 **Responsivo** - Mobile-first design
- ⚡ **Performance** - 46KB gzipped (Lighthouse score 90+)

---

## 🚀 Quick Start

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-username/todo-list-sdd.git
cd todo-list-sdd
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Iniciar servidor de desenvolvimento
```bash
npm run dev
```
- Abre automaticamente em http://localhost:3000
- Hot reload ativado (mudanças refletem instantaneamente)

### 4. Build para produção
```bash
npm run build
```
- Gera otimizado em `dist/` pronto para deployment

---

## 📋 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev           # Inicia servidor dev com hot reload
npm run preview       # Preview de como ficará em produção

# Build
npm run build         # Build otimizado para produção
npm run type-check    # Verifica tipos TypeScript

# Testes
npm run test          # Roda testes unitários
npm run test:ui       # Interface gráfica de testes
npm run test:coverage # Relatório de cobertura

# Qualidade de código
npm run lint          # ESLint
npm run lint:fix      # ESLint com auto-fix
npm run format        # Prettier
npm run format:check  # Verifica formatação

# E2E
npm run test:e2e      # Testes end-to-end com Playwright
```

---

## 🏗️ Arquitetura

### MVC Pattern (Obrigatório)
```
src/
├── models/          # Lógica de negócio (Task, Reminder)
├── services/        # Serviços de aplicação (Storage, Task, Reminder, etc.)
├── controllers/     # Orquestradores (integram Models + Services + Views)
├── components/      # Componentes React (Views)
├── types/           # Definições TypeScript
├── constants/       # Mensagens pt-BR, configurações
└── utils/           # Funções auxiliares
```

### Fluxo de Dados
```
User Interaction (Component)
        ↓
    Controller
        ↓
    Service (Lógica)
        ↓
    Model (Validação)
        ↓
    Storage (localStorage)
```

---

## 🔧 Configuração

### Variáveis de Ambiente
Copie `.env.example` → `.env`:
```bash
cp .env.example .env
```

Variáveis disponíveis:
- `VITE_APP_ENV` - development | production
- `VITE_NOTIFICATION_ENABLED` - Ativar notificações
- `VITE_MAX_TASKS` - Limite de tarefas (padrão: 100)
- `VITE_STORAGE_PREFIX` - Prefixo localStorage (padrão: todo-list)

---

## 📦 Dependências Principais

| Pacote | Versão | Uso |
|--------|--------|-----|
| React | 18.2 | UI Framework |
| TypeScript | 5.3 | Type Safety |
| Vite | 5.0 | Build Tool |
| Vitest | 1.1 | Testes Unitários |
| Playwright | 1.40 | Testes E2E |
| ESLint | 8.54 | Linting |
| Prettier | 3.1 | Formatação |

---

## 🧪 Testes

### Estrutura
```
tests/
├── unit/          # Testes unitários
│   ├── models/
│   └── services/
├── integration/   # Testes de integração
└── e2e/          # Testes end-to-end
```

### Rodar testes
```bash
npm run test              # Modo watch
npm run test:coverage     # Com relatório de cobertura
npm run test:e2e          # Testes E2E
```

---

## 🚀 Deployment

### Vercel (Recomendado)
```bash
git push origin main
# Vercel detecta e faz deploy automático
```

### GitHub Pages
```bash
npm run build
git add dist/
git commit -m "Build"
git push
```

Veja [DEPLOYMENT.md](./docs/DEPLOYMENT.md) para detalhes completos.

---

## 📚 Documentação

- [DEPLOYMENT.md](./docs/DEPLOYMENT.md) - Guia de deployment
- [API.md](./docs/API.md) - Referência de API (a gerar)
- [CONTRIBUTING.md](./docs/CONTRIBUTING.md) - Como contribuir (a gerar)
- [Especificação](./specs/002-task-management/spec.md) - Requisitos

---

## 📊 Status do Projeto

| Fase | Status | Tarefas |
|------|--------|---------|
| Setup | ✅ Complete | 8/8 |
| Foundational | ✅ Complete | 14/14 |
| US1 Delete Tasks | ⏳ Ready | 0/11 |
| US2 Reminders | ⏳ Ready | 0/14 |
| US3 Full Workflow | ⏳ Ready | 0/10 |
| UI Polish | ⏳ Ready | 0/8 |
| Docs & CI/CD | ⏳ Ready | 0/15 |
| QA | ⏳ Ready | 0/8 |
| **Total** | **25%** | **22/88** |

---

## 🤝 Contribuindo

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/sua-feature`
3. Commit mudanças: `git commit -m "Add sua-feature"`
4. Push: `git push origin feature/sua-feature`
5. Abra um Pull Request

---

## 📝 Convenções de Código

- **Linguagem**: TypeScript strict mode
- **Nomes**: camelCase (variáveis/funções), PascalCase (classes/componentes)
- **Commits**: Português-brasileiro, formato convencional
- **Formatação**: Prettier (2 spaces, single quotes)
- **Linting**: ESLint com strict rules

---

## 📄 Licença

MIT - veja [LICENSE](./LICENSE) para detalhes

---

## 📞 Suporte

- 🐛 Bugs: Abra uma [Issue](https://github.com/seu-username/todo-list-sdd/issues)
- 💡 Sugestões: [Discussions](https://github.com/seu-username/todo-list-sdd/discussions)
- 📧 Email: seu-email@exemplo.com

---

**Última atualização**: 2026-05-10  
**Versão**: 0.1.0 (MVP)  
**Especificação**: [SDD](./specs/002-task-management/)
