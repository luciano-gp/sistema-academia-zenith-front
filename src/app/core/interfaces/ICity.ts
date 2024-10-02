import { IState } from "./IState";

export interface ICity {
    id: number;
    nome: string;
    estado: IState;
}