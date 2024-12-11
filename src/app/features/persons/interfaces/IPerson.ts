import { ICity } from "../../../core/interfaces/ICity";
import { IUser } from "../../auth/interfaces/IUser";
import { ITraining } from "../../trainings/interfaces/ITraining";

export interface IPerson {
    id: number | null;
    nome: string;
    dt_nascimento: string;
    cpf: string;
    endereco: string;
    telefone: string;
    genero?: string;
    email?: string;
    usuario: IUser;
    cidade: ICity;
    ref_usuario: number;
    ref_cidade: number;
    treino: ITraining[];
}