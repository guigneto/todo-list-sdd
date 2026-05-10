/**
 * NotificationService
 * Serviço de notificações usando Notification API do navegador
 */
export class NotificationService {
  /**
   * Verificar se notificações estão disponíveis
   */
  public static isAvailable(): boolean {
    return 'Notification' in window;
  }

  /**
   * Verificar permissão de notificações
   */
  public static hasPermission(): boolean {
    return this.isAvailable() && Notification.permission === 'granted';
  }

  /**
   * Solicitar permissão de notificações
   */
  public static async requestPermission(): Promise<boolean> {
    if (!this.isAvailable()) {
      console.warn('Notification API não disponível');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (erro) {
      console.error('Erro ao solicitar permissão de notificação:', erro);
      return false;
    }
  }

  /**
   * Disparar notificação
   */
  public static notify(
    titulo: string,
    opcoes?: NotificationOptions
  ): Notification | null {
    if (!this.hasPermission()) {
      console.warn('Sem permissão para enviar notificações');
      return null;
    }

    try {
      const notificacao = new Notification(titulo, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...opcoes,
      });

      // Auto-fechar após 5 segundos se não tiver interação
      setTimeout(() => {
        notificacao.close();
      }, 5000);

      return notificacao;
    } catch (erro) {
      console.error('Erro ao enviar notificação:', erro);
      return null;
    }
  }

  /**
   * Disparar notificação de tarefa concluída
   */
  public static notifyTaskCompleted(tarefaTitulo: string): void {
    this.notify('Tarefa Concluída', {
      body: `${tarefaTitulo} foi marcada como concluída`,
      tag: 'task-completed',
    });
  }

  /**
   * Disparar notificação de tarefa deletada
   */
  public static notifyTaskDeleted(tarefaTitulo: string): void {
    this.notify('Tarefa Deletada', {
      body: `${tarefaTitulo} foi removida da lista`,
      tag: 'task-deleted',
    });
  }

  /**
   * Disparar notificação de lembrete
   */
  public static notifyReminder(tarefaTitulo: string, descricao?: string): void {
    this.notify('Lembrete', {
      body: `${tarefaTitulo}${descricao ? ': ' + descricao : ''}`,
      tag: 'reminder',
    });
  }

  /**
   * Disparar notificação de erro
   */
  public static notifyError(mensagem: string): void {
    this.notify('Erro', {
      body: mensagem,
      tag: 'error',
    });
  }
}
