import React, { useState } from 'react';
import type { CreateTaskInput } from '../types/Task';
import './TaskForm.css';

interface TaskFormProps {
  onSubmit: (input: CreateTaskInput) => void;
  isLoading?: boolean;
}

/**
 * TaskForm
 * Formulário para criar novas tarefas
 */
const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, isLoading = false }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo.trim()) {
      alert('Por favor, digite um título para a tarefa');
      return;
    }

    onSubmit({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
    });

    setTitulo('');
    setDescricao('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="titulo">Título da Tarefa</label>
        <input
          id="titulo"
          type="text"
          placeholder="O que você precisa fazer?"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          disabled={isLoading}
          maxLength={255}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="descricao">Descrição (opcional)</label>
        <textarea
          id="descricao"
          placeholder="Adicione detalhes sobre a tarefa..."
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          disabled={isLoading}
          maxLength={2000}
          rows={3}
        />
      </div>

      <button type="submit" className="btn-submit" disabled={isLoading}>
        {isLoading ? 'Criando...' : '+ Nova Tarefa'}
      </button>
    </form>
  );
};

export default TaskForm;
