import { ReminderModel } from '../models/Reminder';
import { StorageService } from './StorageService';
import type { Reminder, CreateReminderInput } from '../types/Reminder';

/**
 * ReminderService
 * Serviço de gerenciamento de lembretes
 */
export class ReminderService {
  private storageService: StorageService;
  private readonly STORAGE_KEY = 'reminders';
  private checkInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.storageService = new StorageService('todo-list');
  }

  /**
   * Definir novo lembrete
   */
  public definirLembrete(input: CreateReminderInput): Reminder | null {
    try {
      const reminder = new ReminderModel(input);
      const validacao = reminder.validar();

      if (!validacao.valido) {
        console.error('Erros de validação:', validacao.erros);
        return null;
      }

      const reminders = this.obterTodosOsLembretes();
      reminders.push(reminder.toJSON());
      this.storageService.set(this.STORAGE_KEY, reminders);

      return reminder.toJSON();
    } catch (erro) {
      console.error('Erro ao definir lembrete:', erro);
      return null;
    }
  }

  /**
   * Obter lembrete por ID
   */
  public obterLembrete(id: string): Reminder | null {
    try {
      const reminders = this.obterTodosOsLembretes();
      return reminders.find((r) => r.id === id) || null;
    } catch (erro) {
      console.error('Erro ao obter lembrete:', erro);
      return null;
    }
  }

  /**
   * Obter todos os lembretes
   */
  public obterTodosOsLembretes(): Reminder[] {
    try {
      const reminders = this.storageService.get<Reminder[]>(
        this.STORAGE_KEY
      );
      return reminders ? reminders.map((r) => ({
        ...r,
        data_hora: new Date(r.data_hora),
        criado_em: new Date(r.criado_em),
      })) : [];
    } catch (erro) {
      console.error('Erro ao obter lembretes:', erro);
      return [];
    }
  }

  /**
   * Obter lembretes de uma tarefa
   */
  public obterLembretesDaTarefa(tarefaId: string): Reminder[] {
    return this.obterTodosOsLembretes().filter(
      (r) => r.tarefa_id === tarefaId && !r.foi_disparado
    );
  }

  /**
   * Remover lembrete
   */
  public removerLembrete(id: string): boolean {
    try {
      const reminders = this.obterTodosOsLembretes();
      const novasList = reminders.filter((r) => r.id !== id);

      if (novasList.length === reminders.length) {
        return false; // Lembrete não encontrado
      }

      this.storageService.set(
        this.STORAGE_KEY,
        novasList.map((r) => ({
          ...r,
          data_hora: r.data_hora.toISOString(),
          criado_em: r.criado_em.toISOString(),
        }))
      );
      return true;
    } catch (erro) {
      console.error('Erro ao remover lembrete:', erro);
      return false;
    }
  }

  /**
   * Marcar lembrete como disparado
   */
  public marcarComoDisparado(id: string): Reminder | null {
    try {
      const reminder = this.obterLembrete(id);
      if (!reminder) {
        return null;
      }

      const reminders = this.obterTodosOsLembretes();
      const indice = reminders.findIndex((r) => r.id === id);
      reminders[indice].foi_disparado = true;

      this.storageService.set(
        this.STORAGE_KEY,
        reminders.map((r) => ({
          ...r,
          data_hora: r.data_hora instanceof Date ? r.data_hora.toISOString() : r.data_hora,
          criado_em: r.criado_em instanceof Date ? r.criado_em.toISOString() : r.criado_em,
        }))
      );

      return reminders[indice];
    } catch (erro) {
      console.error('Erro ao marcar lembrete como disparado:', erro);
      return null;
    }
  }

  /**
   * Verificar lembretes que devem ser disparados
   */
  public verificarLembretes(): Reminder[] {
    try {
      const agora = new Date();
      const reminders = this.obterTodosOsLembretes();
      const lembretesADisparam: Reminder[] = [];

      reminders.forEach((reminder) => {
        if (!reminder.foi_disparado && new Date(reminder.data_hora) <= agora) {
          lembretesADisparam.push(reminder);
        }
      });

      return lembretesADisparam;
    } catch (erro) {
      console.error('Erro ao verificar lembretes:', erro);
      return [];
    }
  }

  /**
   * Iniciar verificador de lembretes periódico
   */
  public iniciarVerificador(intervalo: number = 5000): void {
    if (this.checkInterval) {
      return;
    }

    this.checkInterval = setInterval(() => {
      this.verificarLembretes();
    }, intervalo);
  }

  /**
   * Parar verificador de lembretes
   */
  public pararVerificador(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  /**
   * Limpar todos os lembretes
   */
  public limparTodos(): void {
    this.storageService.set(this.STORAGE_KEY, []);
  }
}
