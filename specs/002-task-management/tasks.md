---
description: "Tarefas de implementação para Gerenciamento de Tarefas com Lembretes"
---

# Tarefas: Gerenciamento de Tarefas com Lembretes

**Input**: Documentos de design de `/specs/002-task-management/`  
**Pré-requisitos**: plan.md (obrigatório), spec.md (obrigatório para histórias de usuário)

**Testes**: Tarefas de teste SÃO OBRIGATÓRIAS para esta feature (especificado em plan.md)

**Organização**: Tarefas agrupadas por história de usuário para permitir implementação independente

## Formato: `[ID] [P?] [Story] Descrição com caminho do arquivo`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências)
- **[Story]**: Qual história de usuário (e.g., [US1], [US2], [US3])
- Inclua caminhos exatos dos arquivos

---

## Phase 1: Setup (Inicialização do Projeto)

**Propósito**: Inicialização do projeto e estrutura base  
**Dependências**: Nenhuma (começar aqui)

- [x] T001 Criar estrutura de diretórios per plan.md (src/, tests/, docs/, .github/workflows/)
- [x] T002 Inicializar package.json com dependencies (TypeScript, React, Vite, Jest, etc.)
- [x] T003 [P] Configurar tsconfig.json com configurações TypeScript strict
- [x] T004 [P] Configurar vite.config.ts para build e dev server
- [x] T005 [P] Configurar .eslintrc.json com regras de código limpo (pt-BR friendly)
- [x] T006 [P] Configurar prettier.config.js para formatação automática
- [x] T007 Criar .env.example com variáveis de ambiente necessárias
- [x] T008 [P] Criar arquivos de configuração CI/CD (.github/workflows/test.yml, deploy.yml)

**Checkpoint**: Projeto setup completo, dependências instaladas, tooling funcional

---

## Phase 2: Foundational (Infraestrutura Bloqueante)

**Propósito**: Core infrastructure que DEVE estar completa antes de ANY user story  
**Crítico**: Nenhuma história de usuário pode começar até esta phase estar 100% pronta

### Models (Entidades)

- [x] T009 [P] Criar interface de Type para Task em src/types/Task.ts (id, titulo, descricao, criada_em, concluida_em, status, lembrete)
- [x] T010 [P] Criar interface de Type para Reminder em src/types/Reminder.ts (id, tarefa_id, data_hora, foi_disparado, criado_em)
- [x] T011 [P] Criar classe Task em src/models/Task.ts com métodos de validação
- [x] T012 [P] Criar classe Reminder em src/models/Reminder.ts com métodos de validação

### Services (Lógica de Negócio)

- [x] T013 [P] Criar StorageService em src/services/StorageService.ts para gerenciar localStorage (get, set, remove, getAll)
- [x] T014 Criar TaskService em src/services/TaskService.ts com métodos (criarTarefa, deletarTarefa, listarTarefas, atualizarStatus) - depende T011, T013
- [x] T015 Criar ReminderService em src/services/ReminderService.ts com métodos (definirLembrete, removerLembrete, verificarLembretes) - depende T012, T013
- [x] T016 [P] Criar DateService em src/services/DateService.ts para formatação de datas em pt-BR
- [x] T017 [P] Criar ValidationService em src/services/ValidationService.ts para validações comuns
- [x] T018 [P] Criar NotificationService em src/services/NotificationService.ts para disparar notificações via Notification API ou toast

### Constants & Utilities

- [x] T019 [P] Criar arquivo de mensagens em pt-BR em src/constants/messages.ts (erros, validações, confirmações)
- [x] T020 [P] Criar arquivo de configurações em src/constants/config.ts (limites, timeouts, defaults)
- [x] T021 [P] Criar utilitários de datas em src/utils/dateUtils.ts (parse, format, isInPast, etc.)
- [x] T022 [P] Criar utilitários de strings em src/utils/stringUtils.ts (trim, validate, etc.)

**Checkpoint**: Infraestrutura de modelos, serviços e utilidades completa - US1, US2, US3 podem começar em paralelo

---

## Phase 3: User Story 1 - Remover Tarefas (P1) 🎯 MVP

**Goal**: Usuários podem deletar tarefas com confirmação e a deleção é persistida  
**Teste Independente**: Criar tarefa → deletar com confirmação → tarefa removida da lista → recarregar página → tarefa permanece deletada

### Testes para User Story 1 (OBRIGATÓRIO)

> **IMPORTANTE**: Escrever testes PRIMEIRO, garantir que FALHEM antes da implementação

- [ ] T023 [P] [US1] Teste unitário para Task.delete() em tests/unit/models/Task.test.ts (verificar id, estado)
- [ ] T024 [P] [US1] Teste unitário para TaskService.deletarTarefa() em tests/unit/services/TaskService.test.ts (persistência, lista atualizada)
- [ ] T025 [P] [US1] Teste unitário para validações de deleção em tests/unit/services/ValidationService.test.ts
- [ ] T026 [US1] Teste de integração para fluxo de deleção em tests/integration/task-deletion.test.ts (criar → deletar → verificar)

### Implementação para User Story 1

- [ ] T027 [US1] Implementar TaskController.deletarTarefa() em src/controllers/TaskController.ts (orquestracao de delete) - depende T014
- [ ] T028 [US1] Criar componente TaskItem.tsx em src/components/TaskItem.tsx com botão "Deletar"
- [ ] T029 [US1] Criar componente DeleteConfirmationModal.tsx em src/components/DeleteConfirmationModal.tsx para confirmação
- [ ] T030 [US1] Integrar confirmação no fluxo de deleção em TaskList.tsx
- [ ] T031 [US1] Implementar feedback visual ao usuário (toast de sucesso/erro) em src/components/TaskList.tsx
- [ ] T032 [US1] Adicionar tratamento de erros e logging para operações de deleção
- [ ] T033 [US1] Atualizar docs/API.md com endpoint/função de deleção de tarefas

**Checkpoint**: User Story 1 completa e testável independentemente - US2 e US3 podem começar

---

## Phase 4: User Story 2 - Definir Lembretes em Tarefas (P2)

**Goal**: Usuários podem definir lembretes com data/hora e receber notificações  
**Teste Independente**: Criar tarefa → definir lembrete → aguardar tempo → receber notificação → verificar persistência

### Testes para User Story 2 (OBRIGATÓRIO)

> **IMPORTANTE**: Escrever testes PRIMEIRO, garantir que FALHEM antes da implementação

- [ ] T034 [P] [US2] Teste unitário para Reminder.validate() em tests/unit/models/Reminder.test.ts (data futura, formato)
- [ ] T035 [P] [US2] Teste unitário para ReminderService.definirLembrete() em tests/unit/services/ReminderService.test.ts
- [ ] T036 [P] [US2] Teste unitário para ReminderService.verificarLembretes() em tests/unit/services/ReminderService.test.ts
- [ ] T037 [US2] Teste de integração para disparo de lembrete em tests/integration/reminder-notification.test.ts
- [ ] T038 [US2] Teste de integração para persistência de lembrete em tests/integration/reminder-persistence.test.ts

### Implementação para User Story 2

- [ ] T039 [US2] Implementar ReminderController.definirLembrete() em src/controllers/ReminderController.ts - depende T015
- [ ] T040 [P] [US2] Implementar sistema de polling/timer em ReminderService.verificarLembretes() para disparar lembretes
- [ ] T041 [US2] Implementar NotificationController.dispararNotificacao() em src/controllers/NotificationController.ts - depende T018
- [ ] T042 [US2] Criar componente ReminderModal.tsx em src/components/ReminderModal.tsx para UI de definir lembrete
- [ ] T043 [US2] Criar componente ReminderBadge.tsx em src/components/ReminderBadge.tsx para indicador visual em TaskItem
- [ ] T044 [US2] Integrar ReminderModal no fluxo de edição de tarefas
- [ ] T045 [US2] Implementar validação de data/hora de lembrete (deve ser futura)
- [ ] T046 [US2] Implementar persistência de lembretes em localStorage
- [ ] T047 [US2] Adicionar reinicialização de verificador de lembretes ao carregar página (verificar lembretes passados)
- [ ] T048 [US2] Atualizar docs/API.md com funções de reminders

**Checkpoint**: User Story 2 completa - notificações funcionam, persistem, mesmo após reload

---

## Phase 5: User Story 3 - Gerenciar Ciclo Completo de Tarefas (P1)

**Goal**: Fluxo integrado: criar → lembrete → notificação → completar → deletar  
**Teste Independente**: Fluxo completo funciona sem erros, persistência mantida, todas operações são reversíveis/testáveis

### Testes para User Story 3 (OBRIGATÓRIO)

> **IMPORTANTE**: Escrever testes FIRST, garantir que FALHEM antes da implementação

- [ ] T049 [US3] Teste E2E para fluxo completo em tests/e2e/task-management.spec.ts (criar → lembrete → notificação → completar → deletar)
- [ ] T050 [US3] Teste de integração para múltiplas operações em sequence em tests/integration/full-workflow.test.ts

### Implementação para User Story 3

- [ ] T051 [P] [US3] Criar página principal TaskListPage.tsx em src/pages/TaskListPage.tsx com lista completa
- [ ] T052 [P] [US3] Criar componente TaskList.tsx em src/components/TaskList.tsx (exibir tarefas)
- [ ] T053 [P] [US3] Atualizar TaskItem.tsx para mostrar status de conclusão e indicador de lembrete
- [ ] T054 [US3] Implementar método de marcar tarefa como concluída em TaskService.atualizarStatus() - depende T014
- [ ] T055 [US3] Criar componente de UI para marcar tarefa como concluída
- [ ] T056 [US3] Integrar fluxo completo em TaskListPage.tsx (criar → definir lembrete → receber notificação → completar → deletar)
- [ ] T057 [US3] Adicionar indicadores visuais de estado (pendente, concluída)
- [ ] T058 [US3] Teste manual do fluxo completo (5 vezes, cenários diferentes)

**Checkpoint**: Aplicação funcional com fluxo completo de usuário

---

## Phase 6: UI Polish & Integration

**Propósito**: Melhorias de UX, responsividade, acessibilidade  
**Pode rodar em paralelo com US3**

### Layout & Responsividade

- [ ] T059 [P] Criar página App.tsx com layout principal em src/pages/App.tsx
- [ ] T060 [P] Adicionar estilos CSS responsivos (mobile-first) em src/styles/
- [ ] T061 [P] Implementar tema com cores e tipografia pt-BR friendly
- [ ] T062 [P] Testar responsividade em mobile (iPhone, Android)

### Acessibilidade & UX

- [ ] T063 [P] Adicionar labels ARIA em componentes (para screen readers)
- [ ] T064 [P] Implementar keyboard navigation (Tab, Enter, Escape)
- [ ] T065 [P] Adicionar feedback de loading states
- [ ] T066 [P] Implementar tratamento de erros com mensagens claras em pt-BR

---

## Phase 7: Cross-Cutting Concerns

**Propósito**: Documentação, deployment, CI/CD, testes finais

### Documentação

- [ ] T067 [P] Escrever README.md com instruções de instalação, uso, desenvolvimento
- [ ] T068 [P] Criar CONTRIBUTING.md com guia de contribuição
- [ ] T069 [P] Criar API.md com referência de funções/endpoints
- [ ] T070 [P] Criar DEPLOYMENT.md com instruções para Vercel/GitHub Pages
- [ ] T071 [P] Adicionar comentários/docstrings em todas as funções em pt-BR

### CI/CD & Testes

- [ ] T072 Configurar GitHub Actions workflow para testes em .github/workflows/test.yml
- [ ] T073 Configurar GitHub Actions workflow para deploy em .github/workflows/deploy.yml (Vercel ou Pages)
- [ ] T074 Executar suite completa de testes (unit, integration, e2e)
- [ ] T075 Verificar cobertura de testes (target: >80%)
- [ ] T076 Executar linting e formatação

### Build & Deploy

- [ ] T077 Criar build de produção (`npm run build`)
- [ ] T078 Testar build localmente
- [ ] T079 Deploy em Vercel ou GitHub Pages
- [ ] T080 Validar deploy em produção (verificar URL, funcionalidade)
- [ ] T081 Criar CHANGELOG.md com release notes

---

## Phase 8: QA & Sign-Off

**Propósito**: Validação final antes de merge  
**Checklist completo de testes**

- [ ] T082 Executar teste manual completo (5 cenários diferentes)
- [ ] T083 Verificar compatibilidade de browsers (Chrome, Firefox, Safari, Edge)
- [ ] T084 Verificar performance (Lighthouse score >85)
- [ ] T085 Verificar segurança (sem XSS, CSRF, etc.)
- [ ] T086 Verificar localização pt-BR (todas mensagens, datas, números)
- [ ] T087 Code review (auto-review: sem console.log, sem TODO não-documentados)
- [ ] T088 [P] Criar PR com descrição completa, screenshots, vídeo demo (se possível)

---

## Dependências Entre Histórias de Usuário

```
Phase 1: Setup
  ↓
Phase 2: Foundational (Models, Services, Constants)
  ↓
├─→ Phase 3: US1 (Remover Tarefas) ──┐
├─→ Phase 4: US2 (Lembretes)        ├─→ Phase 5: US3 (Fluxo Completo)
└─→ Começam em paralelo após Phase 2┘
  ↓
Phase 6: UI Polish (paralelo com US3)
  ↓
Phase 7: Documentation, CI/CD
  ↓
Phase 8: QA & Sign-Off
```

**Ordem de Execução Recomendada**:
1. Completar Phase 1 (Setup) - 1 pessoa, 1-2 horas
2. Completar Phase 2 (Foundational) - 2 pessoas em paralelo, 3-4 horas
3. Executar US1 + US2 + Phase 6 em paralelo (3 equipes) - 4-6 horas cada
4. Integrar tudo em US3 - 2-3 horas
5. Completar Phase 7 + Phase 8 - 2-3 horas

**Tempo Total Estimado**: 20-24 horas de desenvolvimento

---

## Exemplos de Execução Paralela por Equipe

### Cenário 1: 1 Pessoa (Sequencial)
- Execute todas as tasks em ordem (T001 → T088)
- Tempo: 3-4 dias

### Cenário 2: 2 Pessoas (Paralelo após Phase 2)
- **Pessoa 1**: T001-T008 (Setup), T009-T022 (Foundational), T023-T033 (US1), T067-T071 (Docs)
- **Pessoa 2**: T023-T048 (US2), T049-T058 (US3), T059-T066 (UI Polish), T072-T088 (CI/CD + QA)
- Tempo: 2 dias

### Cenário 3: 3 Pessoas (Máximo Paralelo)
- **Pessoa 1**: T001-T022 (Setup + Foundational)
- **Pessoa 2**: T023-T048 (US1 + US2 testes + impl)
- **Pessoa 3**: T049-T058 (US3 implementation)
- Após P1 completo, equipes convergem: P2 cuida UI/Tests, P3 cuida Docs/Deploy
- Tempo: 1-2 dias

---

## Status & Progresso

**Total de Tarefas**: 88  
**Phase 1 (Setup)**: 8 tarefas  
**Phase 2 (Foundational)**: 14 tarefas  
**Phase 3 (US1)**: 11 tarefas (4 testes + 7 impl)  
**Phase 4 (US2)**: 14 tarefas (5 testes + 9 impl)  
**Phase 5 (US3)**: 10 tarefas (2 testes + 8 impl)  
**Phase 6 (UI Polish)**: 8 tarefas  
**Phase 7 (Docs + CI/CD)**: 15 tarefas  
**Phase 8 (QA)**: 8 tarefas  

---

**Version**: 1.0.0 | **Status**: Pronto para Implementação | **Data**: 2026-05-10
