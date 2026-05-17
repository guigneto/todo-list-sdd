# 📋 Changelog

Histórico de versões e mudanças da aplicação TODO List.

## [0.1.0] - 2026-05-10

### ✨ Adicionado

- **Gerenciamento de Tarefas**
  - Criar novas tarefas com título e descrição
  - Listar todas as tarefas
  - Marcar tarefas como concluída/pendente
  - Deletar tarefas com confirmação
  - Filtrar por status (todas, pendentes, concluídas)

- **Interface**
  - Componente TaskForm para criar tarefas
  - Componente TaskList para listar tarefas
  - Componente TaskItem para renderizar tarefa individual
  - Modal de confirmação para deleção
  - Toast de notificações (sucesso/erro/info)
  - Responsivo para desktop e mobile

- **Persistência**
  - localStorage para armazenamento de tarefas
  - Dados persistem entre sessões do navegador
  - StorageService para abstração de dados

- **Segurança**
  - Validação rigorosa de inputs
  - Sanitização de strings (XSS prevention)
  - TypeScript strict mode

- **Localização**
  - 100% em português brasileiro
  - Mensagens, confirmações e erros em pt-BR
  - Data/hora formatados em locale pt-BR

- **Desenvolvimento**
  - React 18.2 + TypeScript 5.3
  - Vite 5.0 para build e dev
  - ESLint para code quality
  - Prettier para formatação
  - Vitest para testes unitários
  - Playwright para testes E2E

- **Deployment**
  - GitHub Pages pronto
  - Vercel pronto (vercel.json configurado)
  - GitHub Actions CI/CD
  - Deploy automático ao push

- **Documentação**
  - MkDocs integrado
  - Guia de início rápido
  - Documentação de arquitetura
  - Deploy guides (GitHub Pages + Vercel)
  - FAQ completo
  - README.md detalhado

### 🏗️ Estrutura

- **Padrão MVC:** Models, Services, Controllers, React Components
- **Build:** 158 KB JS, 50 KB gzipped (otimizado)
- **Testes:** Suporte para unit + E2E tests
- **Config:** TypeScript, ESLint, Prettier, Vite otimizado

---

## Notas de Versão

### 0.1.0

**Objetivo:** Versão 1 totalmente funcional com gerenciamento de tarefas, persistência local e deploy automatizado.

**Destaques:**
- ✨ Interface completamente funcional
- 🎨 Design responsivo e moderno
- 📝 100% em português brasileiro
- 🚀 Deploy automatizado em GitHub Pages e Vercel
- 📊 Build otimizado (~50 KB gzipped)

**Características:**
- Armazenamento local no navegador (localStorage) — sem dependência de backend
- Funciona totalmente offline após o primeiro carregamento
- Build pequeno e rápido (Vite + React + TypeScript)

---

## Como Reportar Bugs

Se encontrar algum problema:

1. Abra [GitHub Issues](https://github.com/seu-usuario/todo-list-sdd/issues)
2. Descreva o problema
3. Inclua steps para reproduzir
4. Mencione browser e SO
5. Anexe screenshots se possível

---

**Obrigado por usar TODO List! 🙏**
