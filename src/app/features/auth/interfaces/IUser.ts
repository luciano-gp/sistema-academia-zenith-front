export interface IUser {
    id: number | null;
    email: string;
    senha?: string;
    tipo: number;
    ativo: boolean;
}