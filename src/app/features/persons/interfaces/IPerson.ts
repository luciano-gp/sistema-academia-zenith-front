import { ICity } from "../../../core/interfaces/ICity";
import { IUser } from "../../auth/interfaces/IUser";

export interface IPerson {
    id: number | null;
    nome: string;
    dt_nascimento: string;
    cpf: string;
    endereco: string;
    telefone: string;
    genero?: string;
    usuario: IUser;
    cidade: ICity;
}