import { IUser } from "../../../features/auth/interfaces/IUser";

export interface ILoginResponse {
    message: string;
    error?: unknown;
    user?: IUser;
}