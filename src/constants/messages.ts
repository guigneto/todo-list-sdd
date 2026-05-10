/**
 * Mensagens e textos em português-brasileiro
 * Centralizadas para facilitar manutenção e i18n
 */
export const MENSAGENS = {
  // Validações
  validacao: {
    tarefaTituloObrigatorio: 'Título da tarefa é obrigatório',
    tarefaTituloMaximo: 'Título não pode ter mais de 255 caracteres',
    tarefaDescricaoMaxima: 'Descrição não pode ter mais de 2000 caracteres',
    lembreteDataObrigatoria: 'Data e hora do lembrete são obrigatórias',
    lembreteDataFutura: 'Data e hora devem ser no futuro',
    campoObrigatorio: (campo: string) => `${campo} é obrigatório`,
    formatoInvalido: (campo: string) => `Formato inválido para ${campo}`,
  },

  // Operações
  operacoes: {
    tarefaCriada: 'Tarefa criada com sucesso',
    tarefaAtualizada: 'Tarefa atualizada com sucesso',
    tarefaDeletada: 'Tarefa deletada com sucesso',
    tarefaConcluida: 'Tarefa marcada como concluída',
    tarefaPendente: 'Tarefa marcada como pendente',
    lembreteCriado: 'Lembrete definido com sucesso',
    lembreteRemovido: 'Lembrete removido com sucesso',
    operacaoCancelada: 'Operação cancelada',
  },

  // Confirmações
  confirmacoes: {
    deletarTarefa: 'Tem certeza que deseja deletar esta tarefa?',
    deletarMultiplasTarefas: 'Tem certeza que deseja deletar estas tarefas?',
    limparTodas: 'Tem certeza que deseja limpar todas as tarefas? Esta ação não pode ser desfeita.',
  },

  // Erros
  erros: {
    erroGenerico: 'Ocorreu um erro ao processar a solicitação',
    tarefaNaoEncontrada: 'Tarefa não encontrada',
    lembr: 'Lembrete não encontrado',
    storageNaoDisponivel: 'Armazenamento local não disponível',
    erroAoSalvar: 'Erro ao salvar dados',
    erroAoCarregar: 'Erro ao carregar dados',
    notificacaoNaoDisponivel: 'Notificações não disponíveis neste navegador',
    notificacaoSemPermissao: 'Sem permissão para enviar notificações',
  },

  // Lembretes
  lembretes: {
    titulo: 'Lembrete',
    proximoLembrete: (tempo: string) => `Próximo lembrete em ${tempo}`,
    lembretesAtivos: 'Você tem lembretes ativos',
    semLembretes: 'Sem lembretes agendados',
  },

  // Gerais
  gerais: {
    carregando: 'Carregando...',
    salvando: 'Salvando...',
    naoHaTarefas: 'Nenhuma tarefa criada ainda',
    buscarTarefas: 'Buscar tarefas...',
    sem resultados: 'Nenhum resultado encontrado',
    voltarAoInicio: 'Voltar ao início',
  },
};
