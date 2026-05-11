# 🔌 API Reference

Documentação completa da API e controladores da aplicação TODO List.

## 📚 Índice

- [Task Controller](#task-controller)
- [Task Service](#task-service)
- [Models](#models)
- [Types](#types)

---

## TaskController

Controlador que orquestra todas as operações de tarefas.

### Métodos

#### `criarTarefa(input: CreateTaskInput): boolean`

Cria uma nova tarefa.

**Parâmetros:**

```typescript
interface CreateTaskInput {
  titulo: string;      // Obrigatório, max 255 chars
  descricao: string;   // Opcional, max 2000 chars
}
```

**Exemplo:**

```typescript
const controller = new TaskController();

const sucesso = controller.criarTarefa({
  titulo: 'Estudar React',
  descricao: 'Aprender componentes e hooks'
});

if (sucesso) {
  console.log('Tarefa criada!');
}
```

**Retorna:**
- `true` se tarefa foi criada com sucesso
- `false` se houve erro (mostra notificação)

---

#### `deletarTarefa(id: string): boolean`

Deleta uma tarefa existente.

**Parâmetros:**
- `id`: ID único da tarefa (UUID)

**Exemplo:**

```typescript
const sucesso = controller.deletarTarefa('abc123...');
if (sucesso) {
  console.log('Tarefa deletada!');
}
```

**Retorna:**
- `true` se deletada com sucesso
- `false` se não encontrada ou erro

---

#### `listarTarefas(): Task[]`

Retorna todas as tarefas.

**Exemplo:**

```typescript
const tarefas = controller.listarTarefas();
console.log(`Total: ${tarefas.length} tarefas`);

tarefas.forEach(tarefa => {
  console.log(`- ${tarefa.titulo} (${tarefa.status})`);
});
```

**Retorna:**
- Array de tarefas

---

#### `obterTarefa(id: string): Task | null`

Obtém uma tarefa específica por ID.

**Exemplo:**

```typescript
const tarefa = controller.obterTarefa('abc123...');
if (tarefa) {
  console.log(tarefa.titulo);
} else {
  console.log('Tarefa não encontrada');
}
```

**Retorna:**
- Objeto `Task` se encontrada
- `null` se não encontrada

---

#### `marcarConcluida(id: string): boolean`

Marca uma tarefa como concluída.

**Exemplo:**

```typescript
const sucesso = controller.marcarConcluida('abc123...');
```

**Retorna:**
- `true` se atualizada com sucesso
- `false` se erro

---

#### `marcarPendente(id: string): boolean`

Marca uma tarefa como pendente.

**Exemplo:**

```typescript
const sucesso = controller.marcarPendente('abc123...');
```

**Retorna:**
- `true` se atualizada com sucesso
- `false` se erro

---

#### `setOnTasksChanged(callback: () => void): void`

Registra callback para quando tarefas mudam. Útil para React re-renders.

**Exemplo:**

```typescript
const controller = new TaskController();

controller.setOnTasksChanged(() => {
  console.log('Tarefas foram alteradas!');
  // React vai re-render com dados atualizados
});
```

---

## TaskService

Serviço de negócio que gerencia persistência de tarefas.

### Métodos

#### `criarTarefa(input: CreateTaskInput): Task | null`

```typescript
const task = taskService.criarTarefa({
  titulo: 'Estudar',
  descricao: 'Estudar React'
});
```

**Validações:**
- titulo: obrigatório, 1-255 chars
- descricao: opcional, max 2000 chars

---

#### `deletarTarefa(id: string): boolean`

```typescript
const sucesso = taskService.deletarTarefa(id);
```

**Retorna:**
- `true` se deletada
- `false` se não encontrada

---

#### `obterTodasAsTarefas(): Task[]`

```typescript
const todas = taskService.obterTodasAsTarefas();
```

---

#### `obterTarefasPorStatus(status: 'pendente' | 'concluída'): Task[]`

```typescript
const pendentes = taskService.obterTarefasPorStatus('pendente');
const concluidas = taskService.obterTarefasPorStatus('concluída');
```

---

#### `marcarConcluida(id: string): Task | null`

```typescript
const task = taskService.marcarConcluida(id);
```

**Atualiza:**
- `status` → 'concluída'
- `concluida_em` → data atual

---

#### `marcarPendente(id: string): Task | null`

```typescript
const task = taskService.marcarPendente(id);
```

**Atualiza:**
- `status` → 'pendente'
- `concluida_em` → undefined

---

#### `contarTarefas(): { total, pendentes, concluidas }`

```typescript
const stats = taskService.contarTarefas();
console.log(`Total: ${stats.total}`);
console.log(`Pendentes: ${stats.pendentes}`);
console.log(`Concluídas: ${stats.concluidas}`);
```

---

## Types

### `Task`

```typescript
interface Task {
  id: string;                    // UUID único
  titulo: string;                // 1-255 caracteres
  descricao: string;             // 0-2000 caracteres
  criada_em: Date;               // Data de criação
  concluida_em?: Date;           // Data de conclusão (opcional)
  status: 'pendente' | 'concluída';  // Status atual
  lembrete?: string;             // ID do lembrete (futuro)
}
```

---

### `CreateTaskInput`

```typescript
interface CreateTaskInput {
  titulo: string;     // Obrigatório
  descricao: string;  // Obrigatório (pode ser string vazia)
}
```

---

### `UpdateTaskInput`

```typescript
interface UpdateTaskInput {
  titulo?: string;
  descricao?: string;
  status?: 'pendente' | 'concluída';
  concluida_em?: Date;
}
```

---

## Exemplos Completos

### Exemplo 1: Fluxo Completo

```typescript
import { TaskController } from '@/controllers/TaskController';

const controller = new TaskController();

// Registrar callback para mudanças
controller.setOnTasksChanged(() => {
  console.log('Tarefas atualizadas!');
});

// Criar tarefa
controller.criarTarefa({
  titulo: 'Estudar React',
  descricao: 'Aprender hooks e state'
});

// Listar todas
const tarefas = controller.listarTarefas();
console.log(`Total: ${tarefas.length}`);

// Marcar como concluída
if (tarefas.length > 0) {
  controller.marcarConcluida(tarefas[0].id);
}

// Deletar
if (tarefas.length > 0) {
  controller.deletarTarefa(tarefas[0].id);
}
```

### Exemplo 2: React Component

```typescript
import { useEffect, useState } from 'react';
import { TaskController } from '@/controllers/TaskController';
import type { Task } from '@/types/Task';

function MeuComponente() {
  const [tarefas, setTarefas] = useState<Task[]>([]);
  const controllerRef = useRef(new TaskController());

  useEffect(() => {
    const controller = controllerRef.current;
    
    // Carregar tarefas iniciais
    setTarefas(controller.listarTarefas());

    // Registrar callback para mudanças
    controller.setOnTasksChanged(() => {
      setTarefas(controller.listarTarefas());
    });
  }, []);

  const handleCriar = (titulo: string) => {
    controllerRef.current.criarTarefa({
      titulo,
      descricao: ''
    });
  };

  return (
    <div>
      {tarefas.map(tarefa => (
        <div key={tarefa.id}>
          <h3>{tarefa.titulo}</h3>
          <p>Status: {tarefa.status}</p>
        </div>
      ))}
    </div>
  );
}

export default MeuComponente;
```

---

## Constantes e Configurações

### Limites

```typescript
// src/constants/config.ts
export const CONFIG = {
  limites: {
    maxTarefas: 100,
    maxLembretes: 50,
    maxTamTitulo: 255,
    maxTamDescricao: 2000
  }
}
```

### Mensagens

```typescript
// src/constants/messages.ts
export const MENSAGENS = {
  operacoes: {
    tarefaCriada: 'Tarefa criada com sucesso!',
    tarefaConcluida: 'Tarefa marcada como concluída!',
    tarefaPendente: 'Tarefa marcada como pendente!',
  },
  erros: {
    tarefaNaoEncontrada: 'Tarefa não encontrada',
    erroAoSalvar: 'Erro ao salvar tarefa',
    erroGenerico: 'Erro ao processar operação'
  }
}
```

---

## Error Handling

### Tratando Erros

```typescript
try {
  const sucesso = controller.criarTarefa({
    titulo: 'Nova Tarefa',
    descricao: ''
  });

  if (!sucesso) {
    console.error('Falhou ao criar tarefa');
  }
} catch (erro) {
  console.error('Erro inesperado:', erro);
}
```

---

## Dicas e Boas Práticas

✅ **Recomendado:**
- Use TypeScript para type safety
- Registre callback `setOnTasksChanged` uma vez
- Trate erros com try/catch
- Use IDs únicos para operações

❌ **Evitar:**
- Acessar localStorage diretamente
- Modificar Task objects diretamente
- Criar múltiplas instâncias de Controller
- Usar dados sem validar

---

**Para mais informações, veja [Arquitetura](architecture.md).**
