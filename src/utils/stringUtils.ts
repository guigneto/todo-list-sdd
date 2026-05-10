/**
 * Utilitários de manipulação de strings
 */

/**
 * Remover espaços em branco desnecessários
 */
export function trim(str: string): string {
  return str.trim();
}

/**
 * Verificar se string está vazia
 */
export function isEmpty(str: string): boolean {
  return !str || str.trim().length === 0;
}

/**
 * Capitalizar primeira letra
 */
export function capitalize(str: string): string {
  if (isEmpty(str)) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncar string com reticências
 */
export function truncate(str: string, maximo: number): string {
  if (str.length <= maximo) return str;
  return str.substring(0, maximo) + '...';
}

/**
 * Sanitizar string removendo caracteres perigosos
 */
export function sanitize(str: string): string {
  return str
    .trim()
    .replace(/[<>]/g, '')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .substring(0, 2000);
}

/**
 * Gerar slug a partir de texto
 */
export function slug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Destacar texto com termo de busca
 */
export function highlight(text: string, termo: string): string {
  if (!termo) return text;

  const regex = new RegExp(`(${termo})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

/**
 * Contar palavras em uma string
 */
export function countWords(str: string): number {
  return str.trim().split(/\s+/).filter((word) => word.length > 0).length;
}

/**
 * Gerar ID único
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
