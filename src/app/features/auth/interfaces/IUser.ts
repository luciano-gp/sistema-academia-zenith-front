export interface IUser {
    id: number;
    email: string;
    senha?: string;
    tipo: number;
    ativo: boolean;
}