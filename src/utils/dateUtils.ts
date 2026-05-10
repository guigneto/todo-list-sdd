/**
 * Utilitários de manipulação de datas
 */

/**
 * Fazer parse de data em formato DD/MM/YYYY ou ISO string
 */
export function parseDate(dataString: string): Date | null {
  if (!dataString) return null;

  // Tentar ISO string primeiro
  const dataISO = new Date(dataString);
  if (!isNaN(dataISO.getTime())) {
    return dataISO;
  }

  // Tentar DD/MM/YYYY
  const partes = dataString.split('/');
  if (partes.length === 3) {
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1; // Mês é 0-indexed
    const ano = parseInt(partes[2], 10);

    const data = new Date(ano, mes, dia);
    if (!isNaN(data.getTime())) {
      return data;
    }
  }

  return null;
}

/**
 * Formatar data para DD/MM/YYYY
 */
export function formatarDataSimples(data: Date): string {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

/**
 * Formatar data e hora para DD/MM/YYYY HH:mm
 */
export function formatarDataHora(data: Date): string {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const hora = String(data.getHours()).padStart(2, '0');
  const minuto = String(data.getMinutes()).padStart(2, '0');
  return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
}

/**
 * Verificar se data está no passado
 */
export function estaNoPassado(data: Date): boolean {
  return data < new Date();
}

/**
 * Verificar se data está no futuro
 */
export function estaNoFuturo(data: Date): boolean {
  return data > new Date();
}

/**
 * Obter diferença em dias entre duas datas
 */
export function diferenacaDias(data1: Date, data2: Date): number {
  const umDia = 24 * 60 * 60 * 1000;
  return Math.floor((data2.getTime() - data1.getTime()) / umDia);
}

/**
 * Adicionar dias a uma data
 */
export function adicionarDias(data: Date, dias: number): Date {
  const resultado = new Date(data);
  resultado.setDate(resultado.getDate() + dias);
  return resultado;
}

/**
 * Obter inicio do dia (00:00:00)
 */
export function getStartOfDay(data: Date): Date {
  const resultado = new Date(data);
  resultado.setHours(0, 0, 0, 0);
  return resultado;
}

/**
 * Obter fim do dia (23:59:59)
 */
export function getEndOfDay(data: Date): Date {
  const resultado = new Date(data);
  resultado.setHours(23, 59, 59, 999);
  return resultado;
}
