import { IPerson } from "../../../features/persons/interfaces/IPerson";

export interface IPersonResponse {
    message?: string;
    error?: unknown;
    person?: IPerson;
}