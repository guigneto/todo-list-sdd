# 🧪 Testes

Guia completo sobre testes na aplicação TODO List.

## 📊 Tipos de Testes

### Unit Tests (Vitest)
Testam componentes individuais de código isoladamente.

```bash
npm run test
```

**Exemplos:**
- TaskModel validação
- TaskService CRUD
- ValidationService validações
- dateUtils funções

### Integration Tests (Vitest)
Testam múltiplos componentes interagindo juntos.

```bash
npm run test
```

**Exemplos:**
- Criar tarefa → Listar tarefas
- Criar → Marcar concluída → Deletar
- TaskService + StorageService

### E2E Tests (Playwright)
Testam a aplicação como usuário real.

```bash
npm run test:e2e
```

**Exemplos:**
- Abrir site → Criar tarefa → Deletar
- Filtrar tarefas
- Notificações aparecem

## 📁 Estrutura de Testes

```
tests/
├── unit/
│   ├── models/
│   │   ├── Task.test.ts
│   │   └── Reminder.test.ts
│   ├── services/
│   │   ├── TaskService.test.ts
│   │   ├── StorageService.test.ts
│   │   └── ValidationService.test.ts
│   └── utils/
│       ├── dateUtils.test.ts
│       └── stringUtils.test.ts
├── integration/
│   ├── task-flow.test.ts
│   └── reminder-flow.test.ts
└── e2e/
    ├── task-management.spec.ts
    └── reminders.spec.ts
```

## 🚀 Executar Testes

### Todos os testes

```bash
npm run test
```

### Apenas unit tests

```bash
npm run test tests/unit
```

### Apenas tests de um arquivo

```bash
npm run test tests/unit/services/TaskService.test.ts
```

### Mode watch (reload automático)

```bash
npm run test -- --watch
```

### Com UI

```bash
npm run test:ui
```

Abre interface visual em `http://localhost:51204`

### E2E tests

```bash
npm run test:e2e
```

### Headless (sem GUI)

```bash
npm run test:e2e -- --headed
```

### Coverage

```bash
npm run test:coverage
```

## ✍️ Escrevendo Testes

### Estrutura Básica

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('TaskModel', () => {
  let task: TaskModel;

  beforeEach(() => {
    task = new TaskModel({
      titulo: 'Test Task',
      descricao: 'Test Description'
    });
  });

  afterEach(() => {
    task = null;
  });

  it('deve criar tarefa com valores corretos', () => {
    expect(task.titulo).toBe('Test Task');
    expect(task.status).toBe('pendente');
  });

  it('deve validar tarefa corretamente', () => {
    const resultado = task.validar();
    expect(resultado.valido).toBe(true);
    expect(resultado.erros).toHaveLength(0);
  });
});
```

### Exemplo: TaskService Tests

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { TaskService } from '@/services/TaskService';
import { StorageService } from '@/services/StorageService';

describe('TaskService', () => {
  let taskService: TaskService;

  beforeEach(() => {
    // Limpar storage antes de cada teste
    const storage = new StorageService('test');
    storage.clear();
    
    taskService = new TaskService();
  });

  it('deve criar tarefa', () => {
    const input = {
      titulo: 'Estudar',
      descricao: 'Aprender React'
    };
    
    const task = taskService.criarTarefa(input);
    
    expect(task).toBeDefined();
    expect(task?.titulo).toBe('Estudar');
  });

  it('deve deletar tarefa existente', () => {
    // Arrange
    const task = taskService.criarTarefa({
      titulo: 'Task to delete',
      descricao: ''
    });
    
    // Act
    const sucesso = taskService.deletarTarefa(task!.id);
    
    // Assert
    expect(sucesso).toBe(true);
    expect(taskService.obterTarefa(task!.id)).toBeNull();
  });

  it('deve falhar deletar tarefa inexistente', () => {
    const sucesso = taskService.deletarTarefa('invalid-id');
    expect(sucesso).toBe(false);
  });

  it('deve listar todas as tarefas', () => {
    taskService.criarTarefa({ titulo: 'Task 1', descricao: '' });
    taskService.criarTarefa({ titulo: 'Task 2', descricao: '' });
    
    const tarefas = taskService.obterTodasAsTarefas();
    
    expect(tarefas).toHaveLength(2);
  });
});
```

### Exemplo: Teste E2E com Playwright

```typescript
import { test, expect } from '@playwright/test';

test.describe('Task Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001');
  });

  test('deve criar tarefa', async ({ page }) => {
    // Arrange
    const titleInput = page.locator('input[placeholder*="precisa fazer"]');
    const submitButton = page.locator('button:has-text("Nova Tarefa")');
    
    // Act
    await titleInput.fill('Estudar React');
    await submitButton.click();
    
    // Assert
    const taskItem = page.locator('h3:has-text("Estudar React")');
    await expect(taskItem).toBeVisible();
  });

  test('deve deletar tarefa com confirmação', async ({ page }) => {
    // Arrange - Criar tarefa
    await page.locator('input[placeholder*="precisa fazer"]').fill('Task to delete');
    await page.locator('button:has-text("Nova Tarefa")').click();
    
    // Act - Deletar
    const deleteButton = page.locator('button[title*="Deletar"]');
    await deleteButton.click();
    
    // Confirmar deleção
    const confirmButton = page.locator('button:has-text("Deletar"):nth-of-type(2)');
    await confirmButton.click();
    
    // Assert
    const taskItem = page.locator('h3:has-text("Task to delete")');
    await expect(taskItem).not.toBeVisible();
  });
});
```

## 🔧 Configurações

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/']
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
```

### playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:3001',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI
  }
});
```

## 📊 Coverage

Ver cobertura de testes:

```bash
npm run test:coverage
```

Gera relatório em `coverage/`:
- `index.html` - Visualização interativa
- Percentual de linhas, branches e funções cobertas

**Meta:** >80% de cobertura

## ✅ Checklist de Testes

Antes de fazer commit, certifique-se:

- [ ] Todos os testes passam (`npm run test`)
- [ ] Sem console errors
- [ ] Coverage > 80%
- [ ] E2E tests passam (`npm run test:e2e`)
- [ ] TypeScript compila sem erros (`npm run type-check`)
- [ ] Linting passa (`npm run lint`)

## 🎯 Boas Práticas

### ✅ Recomendado

```typescript
// Use describe para organizar
describe('TaskService', () => {
  // Use it com descrição clara
  it('deve criar tarefa com título e descrição', () => {
    // Use arrange, act, assert pattern
  });
});

// Use beforeEach para setup
beforeEach(() => {
  storage.clear();
});

// Use expect explicitamente
expect(result).toBe(true);
```

### ❌ Evitar

```typescript
// Evite testes genéricos
it('teste', () => { ... });

// Evite testes interdependentes
let globalVar; // ❌

// Evite múltiplas asserções sem contexto
expect(a).toBe(1);
expect(b).toBe(2);
expect(c).toBe(3);
```

## 🚀 CI/CD

Testes rodap automaticamente no GitHub Actions:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run test:e2e
```

## 📚 Recursos

- [Vitest Docs](https://vitest.dev)
- [Playwright Docs](https://playwright.dev)
- [Testing Library](https://testing-library.com)

---

**Código bem testado é código confiável! 🧪**
