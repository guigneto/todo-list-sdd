# 🔧 Setup Local

Guia para configurar o ambiente de desenvolvimento local.

## 📋 Pré-requisitos

- **Node.js:** v18+ (verificar com `node --version`)
- **npm:** v9+ (verificar com `npm --version`)
- **Git:** v2.30+ (verificar com `git --version`)
- **Editor:** VS Code recomendado

## 🚀 Instalação do Node.js

### Windows

1. Acesse [nodejs.org](https://nodejs.org)
2. Baixe LTS (Long Term Support)
3. Execute o instalador
4. Aceite os termos e siga as instruções
5. Verifique:

```bash
node --version  # v18.x.x
npm --version   # 9.x.x
```

### macOS (Homebrew)

```bash
brew install node
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install nodejs npm
```

## 📥 Clone do Repositório

```bash
git clone https://github.com/seu-usuario/todo-list-sdd.git
cd todo-list-sdd
```

## 📦 Instalação de Dependências

```bash
npm install
```

Isso instalará ~337 pacotes npm na pasta `node_modules/`.

### Verificar instalação

```bash
npm list
```

## 🛠️ Editor (VS Code)

### Instalação

1. Acesse [code.visualstudio.com](https://code.visualstudio.com)
2. Baixe para seu SO
3. Instale

### Extensões Recomendadas

```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension vitest.explorer
```

Ou instale via VS Code:

1. Abra Extensions (Ctrl+Shift+X)
2. Procure por: `ESLint`, `Prettier`, `TypeScript`, `React`, `Vitest`
3. Clique em Install

### Arquivos Recomendados

Crie `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## 🚀 Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev
```

- Inicia servidor Vite em `http://localhost:3001`
- Hot Module Replacement (HMR) habilitado
- Vê mudanças em tempo real

### Build

```bash
npm run build
```

- Compila TypeScript
- Otimiza e minifica assets
- Gera arquivos em `dist/`
- Pronto para produção

### Preview

```bash
npm run preview
```

- Prévia local do build de produção
- Acesse `http://localhost:4173`

### Linting

```bash
npm run lint
```

- Verifica código com ESLint
- Mostra problemas de style e segurança

### Formatação

```bash
npm run format
```

- Formata código com Prettier
- Alinha indentação, espaçamento, etc.

### Testes

```bash
npm run test
```

- Roda testes unitários com Vitest

```bash
npm run test:e2e
```

- Roda testes E2E com Playwright

## 📁 Estrutura Inicial

Após `npm install`, você terá:

```
todo-list-sdd/
├── node_modules/        # Dependências (337 pacotes)
├── src/                 # Código fonte TypeScript/React
├── tests/               # Testes
├── docs/                # Documentação
├── dist/                # Build (gerado pelo npm run build)
├── package.json         # Dependências
├── tsconfig.json        # Config TypeScript
├── vite.config.ts       # Config Vite
└── .env.example         # Variáveis de exemplo
```

## 🌍 Variáveis de Ambiente

### Criar `.env.local`

Copie `.env.example` e customize:

```bash
cp .env.example .env.local
```

### Variáveis Disponíveis

```env
# Ambiente
VITE_APP_ENV=development

# Features
VITE_NOTIFICATION_ENABLED=true

# Storage
VITE_STORAGE_PREFIX=todo-list

# Limites
VITE_MAX_TASKS=100
VITE_MAX_REMINDERS=50

# Validação
VITE_MAX_TITLE_LENGTH=255
VITE_MAX_DESCRIPTION_LENGTH=2000
```

Acesse em código:

```typescript
const env = import.meta.env.VITE_APP_ENV;  // 'development'
```

## 🔄 Fluxo de Desenvolvimento

### 1. Criar branch

```bash
git checkout -b feature/minha-feature
```

### 2. Fazer mudanças

```bash
npm run dev  # Servidor rodando
# Editar arquivo em src/
# Vê mudanças em tempo real no navegador
```

### 3. Verificar qualidade

```bash
npm run lint      # ESLint
npm run format    # Prettier
npm run test      # Testes
npm run build     # Build de produção
```

### 4. Commit

```bash
git add .
git commit -m "feat: adicionar nova feature"
git push origin feature/minha-feature
```

### 5. Pull Request

1. Acesse GitHub
2. Clique em **Pull Request** → **New**
3. Selecione sua branch
4. Descreva mudanças
5. Clique em **Create**

## 🐛 Debug

### VS Code Debugger

Crie `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:3001",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

Inicie debug: F5 → Choose Chrome

### DevTools do Navegador

- F12 ou Ctrl+Shift+I
- **Console:** Veja erros
- **Network:** Verifique requisições
- **Storage:** Acesse localStorage
- **Elements:** Inspecione HTML

## 🔍 Troubleshooting

### "npm command not found"

Node.js não está instalado. [Instale aqui](https://nodejs.org).

### "Port 3000 already in use"

Outra aplicação usa porta 3000:

```bash
npm run dev -- --port 3002
```

### "TypeScript errors"

Reconstrua com:

```bash
npm run build  # Compila
npm run lint   # Verifica
```

### "Module not found"

Reinstale dependências:

```bash
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Próximos Passos

- Leia [🏗️ Arquitetura](../documentation/architecture.md)
- Explore [📁 Estrutura do Projeto](project-structure.md)
- Configure [🧪 Testes](testing.md)

---

**Setup concluído! Comece a desenvolvê! 🎉**
