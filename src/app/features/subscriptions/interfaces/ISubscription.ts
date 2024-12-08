export interface ISubscription {
  id?: number;
  dt_contratacao: string;
  dt_final?: string;
  ref_pessoa: number;
  ref_plano: number;
  ref_motivo_cancelamento?: number;
  dt_suspensao?: string;
  meses_suspensao?: number;
  ref_pessoa_indicacao?: number;
  caminho_contrato?: string;
  ref_forma_pagamento: number;
  numero_parcelas_pagamento?: number;
}
