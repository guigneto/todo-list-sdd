# 📝 TODO List - Gerenciador de Tarefas

Bem-vindo ao **TODO List**, uma aplicação web moderna de gerenciamento de tarefas desenvolvida seguindo a metodologia de **Especificação de Design de Software (SDD)**.

## ✨ Características

- ✅ **Gerenciamento Completo de Tarefas** - Criar, listar, marcar como concluída e deletar tarefas
- ⏰ **Sistema de Lembretes** - Configure lembretes para suas tarefas com notificações em tempo real
- 🎨 **Interface Responsiva** - Design moderno e adaptativo para todos os dispositivos
- 🌐 **100% em Português Brasileiro** - Toda a interface localizada em pt-BR
- 💾 **Armazenamento Local** - Seus dados são salvos no navegador (localStorage)
- 📦 **Sem Dependências de Backend** - Aplicação totalmente standalone, sem servidor necessário
- ⚡ **Performance Otimizada** - Build minificado (~50KB gzipped)
- 🚀 **Pronta para Deploy** - Deploy imediato no Vercel ou GitHub Pages

## 🚀 Início Rápido

### Instalação Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/todo-list-sdd.git
cd todo-list-sdd

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3001` no seu navegador.

### Deploy Imediato

**GitHub Pages:**
```bash
npm run build
git add dist/
git commit -m "Deploy"
git push origin main
```

**Vercel:**
- Acesse [vercel.com](https://vercel.com)
- Importe seu repositório
- Deploy automático!

## 🏗️ Arquitetura

Aplicação desenvolvida com **padrão MVC** em React + TypeScript:

```
┌─────────────────────────────────────┐
│         React Components (View)      │
├─────────────────────────────────────┤
│     Controllers (Orquestração)      │
├─────────────────────────────────────┤
│   Services (Lógica de Negócio)     │
├─────────────────────────────────────┤
│      Models (Entidades)             │
├─────────────────────────────────────┤
│    localStorage (Persistência)      │
└─────────────────────────────────────┘
```

## 📊 Status do Projeto

**Progresso Geral:** 25/88 tarefas completadas (25%)

| Fase | Descrição | Status |
|------|-----------|--------|
| 1 | Setup e Configuração | ✅ Completa (8/8) |
| 2 | Fundações | ✅ Completa (14/14) |
| 3 | User Story 1: Deletar Tarefas | ⏳ Em Progresso (23/30) |
| 4 | User Story 2: Lembretes | ⏳ Pendente |
| 5 | User Story 3: Workflow Completo | ⏳ Pendente |
| 6 | Polish da UI | ⏳ Pendente |
| 7 | Docs & CI/CD | ⏳ Pendente |
| 8 | QA | ⏳ Pendente |

## 🛠️ Stack Tecnológico

- **Frontend:** React 18.2 + TypeScript 5.3
- **Build:** Vite 5.0
- **Styling:** CSS moderno + Responsive Design
- **Testes:** Vitest 1.1 + Playwright 1.40
- **Deployment:** GitHub Pages + Vercel
- **Localization:** pt-BR (100%)

## 📱 Funcionalidades

### Fase 1 ✅ - Setup e Configuração
- Estrutura do projeto
- Configuração TypeScript/Vite
- CI/CD com GitHub Actions
- Deploy preparado

### Fase 2 ✅ - Fundações
- Modelos de dados (Task, Reminder)
- Serviços de persistência
- Validações
- Utilitários de data

### Fase 3 🔄 - Deletar Tarefas (Em Andamento)
- ✅ Criar tarefas
- ✅ Listar tarefas
- ✅ Marcar como concluída/pendente
- 🔄 Deletar com confirmação
- 🔄 Interface completa

## 🔗 Links Úteis

- [📖 Documentação Completa](documentation/architecture.md)
- [🚀 Deploy no GitHub Pages](deployment/github-pages.md)
- [🔧 Setup Local](development/setup.md)
- [❓ Dúvidas Frequentes](faq.md)

## 📝 Licença

Este projeto é fornecido como material educacional para demonstração da metodologia SDD.

---

**Desenvolvido com ❤️ usando SDD (Software Design Documentation)**
