/**
 * Configurações da aplicação
 */
export const CONFIG = {
  // Limites
  limites: {
    maxTarefas: parseInt(import.meta.env.VITE_MAX_TASKS as string) || 100,
    maxLembretes: parseInt(import.meta.env.VITE_MAX_REMINDERS as string) || 100,
    maxTamTitulo: 255,
    maxTamDescricao: 2000,
  },

  // Timeouts
  timeouts: {
    notificacao: parseInt(import.meta.env.VITE_NOTIFICATION_TIMEOUT as string) || 5000,
    verificadorLembretes: parseInt(
      import.meta.env.VITE_REMINDER_CHECK_INTERVAL as string
    ) || 5000,
    tempoAvansoLembrete: parseInt(
      import.meta.env.VITE_REMINDER_LEAD_TIME as string
    ) || 300000, // 5 minutos
  },

  // Features
  features: {
    notificacoesHabilitadas:
      import.meta.env.VITE_NOTIFICATION_ENABLED !== 'false',
    debugMode: import.meta.env.VITE_DEBUG === 'true',
  },

  // Storage
  storage: {
    prefix: import.meta.env.VITE_STORAGE_PREFIX || 'todo-list',
  },

  // Padrões de validação
  validacao: {
    padroTitulo: /^.{1,255}$/,
    padroEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  // Cores (tema)
  cores: {
    primaria: '#3b82f6',
    sucesso: '#10b981',
    aviso: '#f59e0b',
    erro: '#ef4444',
    informacao: '#06b6d4',
  },

  // Ambientes
  ambiente: (import.meta.env.VITE_APP_ENV || 'development') as
    | 'development'
    | 'production'
    | 'test',
};
