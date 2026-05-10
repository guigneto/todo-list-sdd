import type { Reminder, CreateReminderInput } from '../types/Reminder';

/**
 * Classe Reminder
 * Encapsula a lógica de negócio para lembretes
 */
export class ReminderModel implements Reminder {
  id: string;
  tarefa_id: string;
  data_hora: Date;
  foi_disparado: boolean;
  criado_em: Date;

  constructor(input: CreateReminderInput) {
    this.id = this.gerarId();
    this.tarefa_id = input.tarefa_id;
    this.data_hora = input.data_hora;
    this.foi_disparado = false;
    this.criado_em = new Date();
  }

  /**
   * Validar dados do lembrete
   */
  public validar(): { valido: boolean; erros: string[] } {
    const erros: string[] = [];

    if (!this.tarefa_id || this.tarefa_id.trim().length === 0) {
      erros.push('ID da tarefa é obrigatório');
    }

    if (!this.data_hora || !(this.data_hora instanceof Date)) {
      erros.push('Data e hora são obrigatórias e devem ser válidas');
    }

    // Validar que a data é no futuro
    if (this.data_hora && this.data_hora <= new Date()) {
      erros.push('Data e hora devem ser no futuro');
    }

    return {
      valido: erros.length === 0,
      erros,
    };
  }

  /**
   * Marcar lembrete como disparado
   */
  public marcarComoDisparado(): void {
    this.foi_disparado = true;
  }

  /**
   * Verificar se lembrete deve ser disparado
   */
  public deveSerDisparado(): boolean {
    return !this.foi_disparado && new Date() >= this.data_hora;
  }

  /**
   * Gerar ID único para lembrete
   */
  private gerarId(): string {
    return `reminder-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Retornar representação JSON
   */
  public toJSON(): Reminder {
    return {
      id: this.id,
      tarefa_id: this.tarefa_id,
      data_hora: this.data_hora,
      foi_disparado: this.foi_disparado,
      criado_em: this.criado_em,
    };
  }
}
