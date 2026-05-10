/**
 * ValidationService
 * Serviço de validações comuns
 */
export class ValidationService {
  /**
   * Validar se string é vazia ou apenas espaços
   */
  public static isEmptyString(valor: string): boolean {
    return !valor || valor.trim().length === 0;
  }

  /**
   * Validar comprimento de string
   */
  public static isValidLength(
    valor: string,
    minimo: number,
    maximo: number
  ): boolean {
    return valor.length >= minimo && valor.length <= maximo;
  }

  /**
   * Validar email
   */
  public static isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /**
   * Validar data
   */
  public static isValidDate(data: Date): boolean {
    return data instanceof Date && !isNaN(data.getTime());
  }

  /**
   * Validar que data é no futuro
   */
  public static isInFuture(data: Date): boolean {
    return this.isValidDate(data) && data > new Date();
  }

  /**
   * Validar que data é no passado
   */
  public static isInPast(data: Date): boolean {
    return this.isValidDate(data) && data < new Date();
  }

  /**
   * Validar UUID
   */
  public static isValidUUID(id: string): boolean {
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return regex.test(id);
  }

  /**
   * Sanitizar string
   */
  public static sanitize(valor: string): string {
    return valor
      .trim()
      .replace(/[<>]/g, '') // Remover < >
      .substring(0, 255); // Limitar tamanho
  }
}
