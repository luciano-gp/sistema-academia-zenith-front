import { IPerson } from "../../features/persons/interfaces/IPerson";

export interface IPresenceRegister {
    id: number | null;
    dt_entrada: string;
    pessoa: IPerson;
}