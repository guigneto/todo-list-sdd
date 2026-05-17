<!--
RELATÓRIO DE IMPACTO DE SINCRONIZAÇÃO
=====================================
Mudança de versão: 1.2.0 → 2.0.0 (MAJOR: reescrita completa em pt-BR; remoção dos 5 princípios padrão do speckit; substituição por documentação real da stack e arquitetura efetivamente implementadas)
Princípios modificados: Removidos os 5 princípios padrão (Documentation-First, Clean Code, Deployment, Version Control, Documentation MKDOCS). Substituídos por princípios alinhados ao que o projeto realmente entrega.
Seções adicionadas: Stack Tecnológica detalhada; Arquitetura efetivamente implementada; Idioma do projeto (pt-BR mandatório).
Seções removidas: Core Principles (versão genérica speckit), Quality Gates genéricos.
Idioma do documento: agora 100% em português brasileiro.
Templates atualizados: spec-template.md e plan-template.md continuam orientando contexto pt-BR.
TODOs de acompanhamento: nenhum.
-->

# Constituição do Projeto TODO List

**Projeto:** TODO List com Metodologia SDD
**Propósito:** Aplicação web de gerenciamento de tarefas construída sobre a metodologia de Documentos de Design de Software (Software Design Documents), com foco em código limpo, arquitetura clara em camadas e experiência 100% em português brasileiro.

Este documento define o que o projeto **é** hoje — sua stack, sua arquitetura, seu idioma e as práticas que sustentam essas decisões. Qualquer divergência entre o código e este documento deve ser tratada como defeito e corrigida (no código ou na constituição, conforme o caso).

---

## 1. Idioma do Projeto (pt-BR)

O projeto inteiro é, e deve permanecer, em **português brasileiro**. Esta é a decisão de produto mais fundamental — todas as demais escolhas (mensagens de erro, nomes de variáveis voltadas ao domínio, validações, datas) derivam dela.

- **Interface (UI):** todo texto visível ao usuário — rótulos, botões, placeholders, títulos, mensagens de feedback — em pt-BR.
- **Mensagens de validação e erro:** centralizadas em `src/constants/messages.ts`, sempre em pt-BR e com tom consistente (afirmativo, direto, sem jargão técnico).
- **Documentação:** README, MkDocs, comentários relevantes de código e mensagens de commit em pt-BR.
- **Formatação locale-aware:** datas, horas e números formatados com locale `pt-BR` via `Intl` (já encapsulado em `src/utils/dateUtils.ts`).
- **Codificação:** UTF-8 em todos os arquivos para garantir suporte correto a acentuação e caracteres especiais.
- **Sem fallback para inglês em produção:** se uma string nova for adicionada, deve nascer em pt-BR. Não há camada de i18n — o idioma do código de domínio é o próprio pt-BR.

---

## 2. Stack Tecnológica

A stack foi escolhida para entregar uma aplicação **standalone, sem backend**, com build pequeno e deploy gratuito. Cada decisão é explicada abaixo.

### Frontend
- **React 18.2** — biblioteca de UI baseada em componentes. Escolhida pela maturidade, ecossistema e adequação ao padrão MVC client-side adotado.
- **TypeScript 5.3 (strict mode)** — tipagem estática para prevenir bugs em tempo de compilação. O modo estrito é obrigatório: sem `any` implícito, sem propriedades opcionais não-checadas.
- **CSS moderno (sem framework)** — estilos próprios por componente (`*.css` ao lado do `.tsx`), responsivos por *media queries*. A opção por CSS puro mantém o bundle pequeno e evita acoplamento a um framework de design.

### Build e Tooling
- **Vite 5.0** — bundler de desenvolvimento e produção. Substitui Webpack pela rapidez do *dev server* (HMR instantâneo) e pelo build otimizado (~50 KB gzipped).
- **ESLint** — análise estática de código; configuração com regras para React e TypeScript.
- **Prettier** — formatação automática; configuração em `prettier.config.js`.

### Testes
- **Vitest 1.1** — testes unitários e de integração, com API compatível com Jest e integração nativa com Vite.
- **Playwright 1.40** — testes E2E executando em navegadores reais.
- Estrutura em três camadas: `tests/unit/`, `tests/integration/`, `tests/e2e/`.

### Persistência
- **localStorage do navegador** — armazenamento por origem, abstraído em `src/services/StorageService.ts`. Não há backend, banco de dados ou API remota. Toda a persistência vive no cliente, prefixada por `todo-list-`.

### Deploy e CI/CD
- **GitHub Pages** e **Vercel** — ambas plataformas suportadas; configuração em `vercel.json` e workflow em `.github/workflows/deploy.yml`.
- **GitHub Actions** — pipelines para testes (`test.yml`), deploy da aplicação (`deploy.yml`) e deploy da documentação (`docs.yml`).
- **MkDocs (Material theme)** — documentação técnica em `docs/`, publicada automaticamente.

### Versionamento
- **Git + GitHub** — repositório único (mono-repo), branch principal `master`, branches de feature seguindo o padrão `feature/<descricao>` ou `feature/#<issue>-<descricao>`.

---

## 3. Arquitetura

A aplicação adota o padrão **MVC client-side** com uma camada extra de **Services** entre Controllers e Models, refletindo a estrutura real do código sob `src/`.

### 3.1. Camadas

A separação em camadas é a coluna vertebral do projeto. Cada camada tem uma única responsabilidade e só conhece a camada imediatamente abaixo:

**Componentes React (View) — `src/components/`**
- Responsáveis por renderização e captura de interação do usuário.
- Não contêm lógica de negócio nem acessam `localStorage` diretamente.
- Recebem dados e callbacks via *props*; toda mudança de estado é orquestrada pelo container `TaskListPage`.

**Controllers — `src/controllers/`**
- Camada fina que orquestra entre View e Services.
- Recebem ações do usuário (criar, marcar como concluída, deletar) e delegam aos services apropriados.
- Não armazenam estado próprio.

**Services — `src/services/`**
- Implementam as regras de negócio: `TaskService`, `ReminderService`, `StorageService`, `NotificationService`, `ValidationService`, `DateService`.
- Toda persistência passa por `StorageService`; toda validação por `ValidationService`.
- Services não conhecem React — são puramente TypeScript e testáveis em isolamento.

**Models — `src/models/`**
- Encapsulam entidades de domínio (`Task`, `Reminder`) e suas validações.
- Definem a forma canônica dos dados que circulam entre as camadas.

**Tipos — `src/types/`**
- Interfaces TypeScript que descrevem contratos entre camadas. São o "esqueleto" do domínio.

**Constantes — `src/constants/`**
- `messages.ts`: todas as strings em pt-BR exibidas ao usuário.
- `config.ts`: configurações da aplicação (prefixos de storage, limites, etc.).

**Utilitários — `src/utils/`**
- Funções puras de apoio: `dateUtils.ts` (formatação pt-BR de datas), `stringUtils.ts` (sanitização contra XSS).

### 3.2. Estrutura do Repositório (mono-repo)

```
todo-list-sdd/
├── src/                  # Código-fonte da aplicação
│   ├── components/       # View (React)
│   ├── controllers/      # Orquestração
│   ├── services/         # Regras de negócio
│   ├── models/           # Entidades
│   ├── types/            # Contratos TS
│   ├── constants/        # Mensagens pt-BR e config
│   └── utils/            # Utilitários puros
├── tests/                # Unit, integration, e2e
├── docs/                 # Documentação MkDocs
├── specs/                # Especificações SDD
├── .specify/             # Templates e constituição
└── .github/workflows/    # CI/CD
```

### 3.3. Fluxo de Dados

O fluxo é unidirecional: a View dispara uma ação → Controller orquestra → Service aplica regra → Model valida → Storage persiste → callback re-renderiza a View. Isso elimina ambiguidade sobre "onde algo acontece" e torna cada camada testável isoladamente. Os diagramas detalhados de fluxo estão em `docs/documentation/architecture.md`.

### 3.4. Segurança no Cliente

- **Prevenção de XSS:** toda string vinda do usuário passa por sanitização em `stringUtils.ts` antes de ser persistida.
- **Validação de tipos:** TypeScript em modo estrito + validações explícitas nos Models.
- **Sem dados sensíveis:** `localStorage` não é criptografado; a aplicação não armazena senhas, tokens ou informações pessoais identificáveis.

---

## 4. Práticas de Desenvolvimento

As práticas abaixo decorrem das três seções anteriores e existem para preservá-las.

### 4.1. Código limpo e revisão
- Nomes de identificadores em português quando representam conceitos de domínio (ex.: `criarTarefa`, `tituloTarefa`); nomes em inglês são aceitáveis para conceitos técnicos genéricos (ex.: `id`, `callback`).
- Funções pequenas e focadas; uma função, uma responsabilidade.
- DRY aplicado com bom-senso — duplicação rasa é melhor que abstração prematura.
- Toda PR passa por revisão antes de merge.

### 4.2. Testes
- Cobertura-alvo: >80% nos services e models (camadas com lógica).
- Componentes triviais não precisam de teste unitário; cobertos por E2E.
- Testes E2E cobrem os fluxos críticos de usuário.

### 4.3. Versionamento e CI
- `master` é a branch protegida; não há push direto.
- CI obrigatório: lint, build e testes precisam passar antes de merge.
- Mensagens de commit em pt-BR, no imperativo (`adiciona`, `corrige`, `atualiza`).

### 4.4. Documentação
- MkDocs em `docs/` é a fonte única para documentação técnica externa.
- README é o ponto de entrada; quickstart em `docs/quickstart.md`.
- Documentação é atualizada **junto** com o código que ela descreve, na mesma PR.

---

## 5. Governança

**Autoridade da Constituição:** este documento prevalece sobre práticas individuais ou orientações pontuais. Conflitos são resolvidos lendo este texto.

**Processo de alteração:** mudanças significativas (uma das três primeiras seções) exigem PR dedicada com justificativa. Atualizações de detalhes operacionais (seção 4) podem ser feitas livremente.

**Versionamento:** segue SemVer.
- **MAJOR:** mudança incompatível em stack, arquitetura ou idioma.
- **MINOR:** acréscimo de princípio ou seção.
- **PATCH:** ajustes textuais, exemplos, esclarecimentos.

**Revisão:** sempre que a arquitetura ou stack reais divergirem do que está aqui escrito.

---

**Versão:** 2.0.0 | **Ratificada em:** 2026-05-17 | **Última alteração:** 2026-05-17
