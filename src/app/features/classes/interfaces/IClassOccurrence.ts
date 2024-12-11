import { IClass } from "./IClass";

export interface IClassOccurrence {
    id?: number;
    dia_semana?: "Segunda-feira" | "Terça-feira" | "Quarta-feira" | "Quinta-feira" | "Sexta-feira" | "Sábado" | "Domingo";
    horario_final: string
    horario_inicial: string;
    profissional: string;
    vagas: number;
    ref_aula: number;
    aula: IClass;
}