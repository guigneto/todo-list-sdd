/**
 * StorageService
 * Gerencia persistência de dados em localStorage
 */
export class StorageService {
  private prefix: string;

  constructor(prefix: string = 'todo-list') {
    this.prefix = prefix;
  }

  /**
   * Obter item do storage
   */
  public get<T>(chave: string): T | null {
    try {
      const chaveCompleta = `${this.prefix}-${chave}`;
      const valor = localStorage.getItem(chaveCompleta);
      return valor ? JSON.parse(valor) : null;
    } catch (erro) {
      console.error(`Erro ao obter ${chave} do storage:`, erro);
      return null;
    }
  }

  /**
   * Armazenar item no storage
   */
  public set<T>(chave: string, valor: T): boolean {
    try {
      const chaveCompleta = `${this.prefix}-${chave}`;
      localStorage.setItem(chaveCompleta, JSON.stringify(valor));
      return true;
    } catch (erro) {
      console.error(`Erro ao armazenar ${chave}:`, erro);
      return false;
    }
  }

  /**
   * Remover item do storage
   */
  public remove(chave: string): boolean {
    try {
      const chaveCompleta = `${this.prefix}-${chave}`;
      localStorage.removeItem(chaveCompleta);
      return true;
    } catch (erro) {
      console.error(`Erro ao remover ${chave}:`, erro);
      return false;
    }
  }

  /**
   * Obter todos os itens com prefixo específico
   */
  public getAll<T>(prefixoChave: string): T[] {
    try {
      const items: T[] = [];
      const prefixoCompleto = `${this.prefix}-${prefixoChave}`;

      for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        if (chave && chave.startsWith(prefixoCompleto)) {
          const valor = localStorage.getItem(chave);
          if (valor) {
            items.push(JSON.parse(valor));
          }
        }
      }

      return items;
    } catch (erro) {
      console.error('Erro ao obter todos os itens:', erro);
      return [];
    }
  }

  /**
   * Limpar todos os dados com prefix
   */
  public clear(): void {
    try {
      const chavesPorRemover: string[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        if (chave && chave.startsWith(this.prefix)) {
          chavesPorRemover.push(chave);
        }
      }

      chavesPorRemover.forEach((chave) => localStorage.removeItem(chave));
    } catch (erro) {
      console.error('Erro ao limpar storage:', erro);
    }
  }

  /**
   * Verificar se storage está disponível
   */
  public static isAvailable(): boolean {
    try {
      const teste = '__teste__';
      localStorage.setItem(teste, teste);
      localStorage.removeItem(teste);
      return true;
    } catch {
      return false;
    }
  }
}
