import { TaskModel } from '../models/Task';
import { StorageService } from './StorageService';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/Task';

/**
 * TaskService
 * Serviço de gerenciamento de tarefas
 */
export class TaskService {
  private storageService: StorageService;
  private readonly STORAGE_KEY = 'tasks';

  constructor() {
    this.storageService = new StorageService('todo-list');
  }

  /**
   * Criar nova tarefa
   */
  public criarTarefa(input: CreateTaskInput): Task | null {
    try {
      const task = new TaskModel(input);
      const validacao = task.validar();

      if (!validacao.valido) {
        console.error('Erros de validação:', validacao.erros);
        return null;
      }

      const tasks = this.obterTodasAsTarefas();
      tasks.push(task.toJSON());
      this.storageService.set(this.STORAGE_KEY, tasks);

      return task.toJSON();
    } catch (erro) {
      console.error('Erro ao criar tarefa:', erro);
      return null;
    }
  }

  /**
   * Obter tarefa por ID
   */
  public obterTarefa(id: string): Task | null {
    try {
      const tasks = this.obterTodasAsTarefas();
      return tasks.find((t) => t.id === id) || null;
    } catch (erro) {
      console.error('Erro ao obter tarefa:', erro);
      return null;
    }
  }

  /**
   * Obter todas as tarefas
   */
  public obterTodasAsTarefas(): Task[] {
    try {
      const tasks = this.storageService.get<Task[]>(this.STORAGE_KEY);
      return tasks || [];
    } catch (erro) {
      console.error('Erro ao obter tarefas:', erro);
      return [];
    }
  }

  /**
   * Atualizar tarefa
   */
  public atualizarTarefa(id: string, input: UpdateTaskInput): Task | null {
    try {
      const task = this.obterTarefa(id);
      if (!task) {
        return null;
      }

      const tarefaAtualizada: Task = {
        ...task,
        ...input,
      };

      const tasks = this.obterTodasAsTarefas();
      const indice = tasks.findIndex((t) => t.id === id);
      tasks[indice] = tarefaAtualizada;

      this.storageService.set(this.STORAGE_KEY, tasks);
      return tarefaAtualizada;
    } catch (erro) {
      console.error('Erro ao atualizar tarefa:', erro);
      return null;
    }
  }

  /**
   * Deletar tarefa
   */
  public deletarTarefa(id: string): boolean {
    try {
      const tasks = this.obterTodasAsTarefas();
      const novasList = tasks.filter((t) => t.id !== id);

      if (novasList.length === tasks.length) {
        return false; // Tarefa não encontrada
      }

      this.storageService.set(this.STORAGE_KEY, novasList);
      return true;
    } catch (erro) {
      console.error('Erro ao deletar tarefa:', erro);
      return false;
    }
  }

  /**
   * Obter tarefas por status
   */
  public obterTarefasPorStatus(
    status: 'pendente' | 'concluída'
  ): Task[] {
    return this.obterTodasAsTarefas().filter((t) => t.status === status);
  }

  /**
   * Marcar tarefa como concluída
   */
  public marcarConcluida(id: string): Task | null {
    return this.atualizarTarefa(id, {
      status: 'concluída',
      concluida_em: new Date(),
    });
  }

  /**
   * Marcar tarefa como pendente
   */
  public marcarPendente(id: string): Task | null {
    return this.atualizarTarefa(id, {
      status: 'pendente',
      concluida_em: undefined,
    });
  }

  /**
   * Obter número de tarefas
   */
  public contarTarefas(): { total: number; pendentes: number; concluidas: number } {
    const tasks = this.obterTodasAsTarefas();
    return {
      total: tasks.length,
      pendentes: tasks.filter((t) => t.status === 'pendente').length,
      concluidas: tasks.filter((t) => t.status === 'concluída').length,
    };
  }

  /**
   * Limpar todas as tarefas
   */
  public limparTodas(): void {
    this.storageService.set(this.STORAGE_KEY, []);
  }
}
