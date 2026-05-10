import React from 'react';
import TaskItem from './TaskItem';
import type { Task } from '../types/Task';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  isDeleting?: boolean;
  deletingId?: string;
}

/**
 * TaskList
 * Lista de tarefas com filtros por status
 */
const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onToggleStatus,
  isDeleting = false,
  deletingId,
}) => {
  const [filter, setFilter] = React.useState<'todas' | 'pendentes' | 'concluidas'>(
    'todas'
  );

  const filteredTasks = React.useMemo(() => {
    switch (filter) {
      case 'pendentes':
        return tasks.filter((t) => t.status === 'pendente');
      case 'concluidas':
        return tasks.filter((t) => t.status === 'concluída');
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const stats = React.useMemo(() => {
    return {
      total: tasks.length,
      pendentes: tasks.filter((t) => t.status === 'pendente').length,
      concluidas: tasks.filter((t) => t.status === 'concluída').length,
    };
  }, [tasks]);

  return (
    <div className="task-list-container">
      <div className="task-stats">
        <div className="stat">
          <span className="stat-label">Total</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Pendentes</span>
          <span className="stat-value pending">{stats.pendentes}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Concluídas</span>
          <span className="stat-value completed">{stats.concluidas}</span>
        </div>
      </div>

      <div className="task-filters">
        <button
          className={`filter-btn ${filter === 'todas' ? 'active' : ''}`}
          onClick={() => setFilter('todas')}
        >
          Todas ({stats.total})
        </button>
        <button
          className={`filter-btn ${filter === 'pendentes' ? 'active' : ''}`}
          onClick={() => setFilter('pendentes')}
        >
          Pendentes ({stats.pendentes})
        </button>
        <button
          className={`filter-btn ${filter === 'concluidas' ? 'active' : ''}`}
          onClick={() => setFilter('concluidas')}
        >
          Concluídas ({stats.concluidas})
        </button>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <p className="empty-icon">📝</p>
            <h3>Nenhuma tarefa</h3>
            <p>
              {filter === 'todas' &&
                'Crie sua primeira tarefa para começar!'}
              {filter === 'pendentes' &&
                'Você está em dia! Nenhuma tarefa pendente.'}
              {filter === 'concluidas' &&
                'Você ainda não concluiu nenhuma tarefa.'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
              isDeleting={isDeleting && deletingId === task.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
