import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import Toast from './Toast';
import { TaskController } from '../controllers/TaskController';
import type { Task, CreateTaskInput } from '../types/Task';
import './TaskListPage.css';

/**
 * TaskListPage
 * Página principal com gerenciamento completo de tarefas
 */
const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTaskForDelete, setSelectedTaskForDelete] = useState<Task | null>(
    null
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  
  const controllerRef = React.useRef(new TaskController());

  // Inicializar tarefas ao montar
  useEffect(() => {
    const controller = controllerRef.current;
    const initialTasks = controller.listarTarefas();
    setTasks(initialTasks);

    // Registrar callback para mudanças
    controller.setOnTasksChanged(() => {
      const updated = controller.listarTarefas();
      setTasks(updated);
    });
  }, []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
  };

  const handleCreateTask = async (input: CreateTaskInput) => {
    setIsLoading(true);
    try {
      const success = controllerRef.current.criarTarefa(input);
      if (success) {
        showToast('Tarefa criada com sucesso!', 'success');
        const updated = controllerRef.current.listarTarefas();
        setTasks(updated);
      } else {
        showToast('Erro ao criar tarefa', 'error');
      }
    } catch (erro) {
      console.error(erro);
      showToast('Erro ao criar tarefa', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (taskId: string) => {
    const task = controllerRef.current.obterTarefa(taskId);
    if (task) {
      setSelectedTaskForDelete(task);
      setDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedTaskForDelete) return;

    setIsDeleting(true);
    setDeletingId(selectedTaskForDelete.id);

    try {
      const success = controllerRef.current.deletarTarefa(selectedTaskForDelete.id);
      if (success) {
        showToast(`"${selectedTaskForDelete.titulo}" foi deletada`, 'success');
        const updated = controllerRef.current.listarTarefas();
        setTasks(updated);
      } else {
        showToast('Erro ao deletar tarefa', 'error');
      }
    } catch (erro) {
      console.error(erro);
      showToast('Erro ao deletar tarefa', 'error');
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
      setDeleteModalOpen(false);
      setSelectedTaskForDelete(null);
    }
  };

  const handleToggleStatus = async (taskId: string) => {
    try {
      const task = controllerRef.current.obterTarefa(taskId);
      if (!task) return;

      if (task.status === 'pendente') {
        controllerRef.current.marcarConcluida(taskId);
      } else {
        controllerRef.current.marcarPendente(taskId);
      }

      const updated = controllerRef.current.listarTarefas();
      setTasks(updated);
    } catch (erro) {
      console.error(erro);
      showToast('Erro ao atualizar tarefa', 'error');
    }
  };

  return (
    <div className="task-list-page">
      <div className="page-header">
        <h1>📝 Meu Gerenciador de Tarefas</h1>
        <p>Organize suas tarefas e acompanhe seu progresso</p>
      </div>

      <div className="page-content">
        <TaskForm onSubmit={handleCreateTask} isLoading={isLoading} />

        <TaskList
          tasks={tasks}
          onDelete={handleDeleteClick}
          onToggleStatus={handleToggleStatus}
          isDeleting={isDeleting}
          deletingId={deletingId || undefined}
        />
      </div>

      <DeleteConfirmationModal
        title="Deletar Tarefa"
        message={`Tem certeza que deseja deletar "${selectedTaskForDelete?.titulo}"? Esta ação não pode ser desfeita.`}
        isOpen={deleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setSelectedTaskForDelete(null);
        }}
        isLoading={isDeleting}
      />

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};

export default TaskListPage;
