export interface IPlan {
    id: number | null;
    titulo: string;
    descricao?: string;
    dt_inicio: string;
    dt_fim?: string;
    numero_meses_contrato?: number;
    valor_mensal: number;
    modelo_contrato: 'Padrão' | 'Premium' | 'Individual';
    diarias: number;
    ref_historico?: number;
}