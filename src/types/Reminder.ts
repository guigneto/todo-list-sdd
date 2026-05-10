/**
 * Tipo de Lembrete (Reminder)
 * Representa um lembrete associado a uma tarefa
 */
export interface Reminder {
  id: string;
  tarefa_id: string; // ID da tarefa associada
  data_hora: Date;
  foi_disparado: boolean;
  criado_em: Date;
}

/**
 * Tipo para criação de novo lembrete
 */
export interface CreateReminderInput {
  tarefa_id: string;
  data_hora: Date;
}

/**
 * Tipo para atualização de lembrete
 */
export interface UpdateReminderInput {
  data_hora?: Date;
  foi_disparado?: boolean;
}
