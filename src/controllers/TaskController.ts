import { TaskService } from '../services/TaskService';
import { NotificationService } from '../services/NotificationService';
import { MENSAGENS } from '../constants/messages';
import type { Task, CreateTaskInput } from '../types/Task';

/**
 * TaskController
 * Orquestra operações de tarefas entre UI e Services
 */
export class TaskController {
  private taskService: TaskService;
  private onTasksChanged?: () => void;

  constructor() {
    this.taskService = new TaskService();
  }

  /**
   * Registrar callback para quando tarefas mudam
   */
  public setOnTasksChanged(callback: () => void): void {
    this.onTasksChanged = callback;
  }

  /**
   * Criar nova tarefa
   */
  public criarTarefa(input: CreateTaskInput): boolean {
    try {
      const tarefa = this.taskService.criarTarefa(input);

      if (!tarefa) {
        NotificationService.notifyError(MENSAGENS.erros.erroAoSalvar);
        return false;
      }

      NotificationService.notify('Sucesso', {
        body: MENSAGENS.operacoes.tarefaCriada,
        tag: 'task-created',
      });

      this.notificarMudancas();
      return true;
    } catch (erro) {
      console.error('Erro ao criar tarefa:', erro);
      NotificationService.notifyError(MENSAGENS.erros.erroGenerico);
      return false;
    }
  }

  /**
   * Listar todas as tarefas
   */
  public listarTarefas(): Task[] {
    return this.taskService.obterTodasAsTarefas();
  }

  /**
   * Obter tarefa por ID
   */
  public obterTarefa(id: string): Task | null {
    return this.taskService.obterTarefa(id);
  }

  /**
   * Deletar tarefa com confirmação
   */
  public deletarTarefa(id: string): boolean {
    try {
      const tarefa = this.taskService.obterTarefa(id);

      if (!tarefa) {
        NotificationService.notifyError(MENSAGENS.erros.tarefaNaoEncontrada);
        return false;
      }

      const sucesso = this.taskService.deletarTarefa(id);

      if (!sucesso) {
        NotificationService.notifyError(MENSAGENS.erros.erroAoSalvar);
        return false;
      }

      NotificationService.notifyTaskDeleted(tarefa.titulo);
      this.notificarMudancas();
      return true;
    } catch (erro) {
      console.error('Erro ao deletar tarefa:', erro);
      NotificationService.notifyError(MENSAGENS.erros.erroGenerico);
      return false;
    }
  }

  /**
   * Marcar tarefa como concluída
   */
  public marcarConcluida(id: string): boolean {
    try {
      const tarefa = this.taskService.marcarConcluida(id);

      if (!tarefa) {
        NotificationService.notifyError(MENSAGENS.erros.erroAoSalvar);
        return false;
      }

      NotificationService.notify('Sucesso', {
        body: MENSAGENS.operacoes.tarefaConcluida,
        tag: 'task-completed',
      });

      this.notificarMudancas();
      return true;
    } catch (erro) {
      console.error('Erro ao marcar concluída:', erro);
      NotificationService.notifyError(MENSAGENS.erros.erroGenerico);
      return false;
    }
  }

  /**
   * Marcar tarefa como pendente
   */
  public marcarPendente(id: string): boolean {
    try {
      const tarefa = this.taskService.marcarPendente(id);

      if (!tarefa) {
        NotificationService.notifyError(MENSAGENS.erros.erroAoSalvar);
        return false;
      }

      NotificationService.notify('Sucesso', {
        body: MENSAGENS.operacoes.tarefaPendente,
        tag: 'task-pending',
      });

      this.notificarMudancas();
      return true;
    } catch (erro) {
      console.error('Erro ao marcar pendente:', erro);
      NotificationService.notifyError(MENSAGENS.erros.erroGenerico);
      return false;
    }
  }

  /**
   * Notificar que tarefas foram alteradas
   */
  private notificarMudancas(): void {
    if (this.onTasksChanged) {
      this.onTasksChanged();
    }
  }

  /**
   * Obter estatísticas
   */
  public obterEstatisticas() {
    return this.taskService.contarTarefas();
  }
}
