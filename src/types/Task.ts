/**
 * Tipo de Tarefa (Task)
 * Representa uma tarefa individual no sistema de TODO List
 */
export interface Task {
  id: string;
  titulo: string;
  descricao: string;
  criada_em: Date;
  concluida_em?: Date;
  status: 'pendente' | 'concluída';
  lembrete?: string; // ID do lembrete associado
}

/**
 * Tipo para criação de nova tarefa (sem id e datas de sistema)
 */
export interface CreateTaskInput {
  titulo: string;
  descricao: string;
}

/**
 * Tipo para atualização de tarefa
 */
export interface UpdateTaskInput {
  titulo?: string;
  descricao?: string;
  status?: 'pendente' | 'concluída';
  concluida_em?: Date;
}
