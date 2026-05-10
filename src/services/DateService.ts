/**
 * DateService
 * Serviço de formatação e manipulação de datas em pt-BR
 */
export class DateService {
  private static formatter: Intl.DateTimeFormat;
  private static formatterHora: Intl.DateTimeFormat;

  static {
    this.formatter = new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    this.formatterHora = new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  /**
   * Formatar data em pt-BR (DD/MM/YYYY)
   */
  public static formatarData(data: Date): string {
    return this.formatter.format(data);
  }

  /**
   * Formatar data e hora em pt-BR (DD/MM/YYYY HH:mm:ss)
   */
  public static formatarDataHora(data: Date): string {
    return this.formatterHora.format(data);
  }

  /**
   * Formatar data relativa (hoje, ontem, há X dias)
   */
  public static formatarDataRelativa(data: Date): string {
    const agora = new Date();
    const diferenca = agora.getTime() - data.getTime();
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));

    if (dias === 0) {
      return 'Hoje';
    } else if (dias === 1) {
      return 'Ontem';
    } else if (dias < 7) {
      return `${dias} dias atrás`;
    } else if (dias < 30) {
      const semanas = Math.floor(dias / 7);
      return `${semanas} semana${semanas > 1 ? 's' : ''} atrás`;
    }

    return this.formatarData(data);
  }

  /**
   * Adicionar dias a uma data
   */
  public static adicionarDias(data: Date, dias: number): Date {
    const resultado = new Date(data);
    resultado.setDate(resultado.getDate() + dias);
    return resultado;
  }

  /**
   * Adicionar horas a uma data
   */
  public static adicionarHoras(data: Date, horas: number): Date {
    const resultado = new Date(data);
    resultado.setHours(resultado.getHours() + horas);
    return resultado;
  }

  /**
   * Comparar duas datas (ignorando horas)
   */
  public static samesDay(data1: Date, data2: Date): boolean {
    return (
      data1.getFullYear() === data2.getFullYear() &&
      data1.getMonth() === data2.getMonth() &&
      data1.getDate() === data2.getDate()
    );
  }

  /**
   * Obter início do dia
   */
  public static getStartOfDay(data: Date): Date {
    const resultado = new Date(data);
    resultado.setHours(0, 0, 0, 0);
    return resultado;
  }

  /**
   * Obter fim do dia
   */
  public static getEndOfDay(data: Date): Date {
    const resultado = new Date(data);
    resultado.setHours(23, 59, 59, 999);
    return resultado;
  }
}
