import React from 'react';
import type { Task } from '../types/Task';
import './TaskItem.css';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  isDeleting?: boolean;
}

/**
 * TaskItem
 * Componente individual de tarefa com opções de deletar e marcar como concluída
 */
const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  onToggleStatus,
  isDeleting = false,
}) => {
  const isConcluida = task.status === 'concluída';

  return (
    <div className={`task-item ${isConcluida ? 'task-completed' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={isConcluida}
          onChange={() => onToggleStatus(task.id)}
          disabled={isDeleting}
          aria-label={`Marcar "${task.titulo}" como ${isConcluida ? 'pendente' : 'concluída'}`}
        />
      </div>

      <div className="task-content">
        <h3 className="task-title">{task.titulo}</h3>
        {task.descricao && <p className="task-description">{task.descricao}</p>}
        <div className="task-meta">
          <span className="task-date">
            {new Date(task.criada_em).toLocaleDateString('pt-BR')}
          </span>
          <span className={`task-status ${task.status}`}>
            {task.status === 'concluída' ? '✓ Concluída' : 'Pendente'}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="btn-delete"
          onClick={() => onDelete(task.id)}
          disabled={isDeleting}
          title="Deletar tarefa"
          aria-label={`Deletar tarefa "${task.titulo}"`}
        >
          {isDeleting ? '...' : '🗑️'}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
