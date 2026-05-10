import type { Task, CreateTaskInput } from '../types/Task';

/**
 * Classe Task
 * Encapsula a lógica de negócio para tarefas
 */
export class TaskModel implements Task {
  id: string;
  titulo: string;
  descricao: string;
  criada_em: Date;
  concluida_em?: Date;
  status: 'pendente' | 'concluída';
  lembrete?: string;

  constructor(input: CreateTaskInput) {
    this.id = this.gerarId();
    this.titulo = input.titulo;
    this.descricao = input.descricao;
    this.criada_em = new Date();
    this.status = 'pendente';
  }

  /**
   * Validar dados da tarefa
   */
  public validar(): { valido: boolean; erros: string[] } {
    const erros: string[] = [];

    if (!this.titulo || this.titulo.trim().length === 0) {
      erros.push('Título é obrigatório');
    }

    if (this.titulo.length > 255) {
      erros.push('Título não pode ter mais de 255 caracteres');
    }

    if (this.descricao.length > 2000) {
      erros.push('Descrição não pode ter mais de 2000 caracteres');
    }

    return {
      valido: erros.length === 0,
      erros,
    };
  }

  /**
   * Marcar tarefa como concluída
   */
  public marcarConcluida(): void {
    if (this.status !== 'concluída') {
      this.status = 'concluída';
      this.concluida_em = new Date();
    }
  }

  /**
   * Marcar tarefa como pendente
   */
  public marcarPendente(): void {
    if (this.status !== 'pendente') {
      this.status = 'pendente';
      this.concluida_em = undefined;
    }
  }

  /**
   * Associar lembrete à tarefa
   */
  public associarLembrete(lembreteId: string): void {
    this.lembrete = lembreteId;
  }

  /**
   * Remover lembrete da tarefa
   */
  public removerLembrete(): void {
    this.lembrete = undefined;
  }

  /**
   * Gerar ID único para tarefa
   */
  private gerarId(): string {
    return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Retornar representação JSON
   */
  public toJSON(): Task {
    return {
      id: this.id,
      titulo: this.titulo,
      descricao: this.descricao,
      criada_em: this.criada_em,
      concluida_em: this.concluida_em,
      status: this.status,
      lembrete: this.lembrete,
    };
  }
}
