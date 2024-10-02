import { ITraining } from "../../trainings/interfaces/ITraining";
import { IPerson } from "./IPerson";

export interface IPersonTraining {
    pessoa: IPerson;
    treino: ITraining;
    dt_inicial: string;
    dt_final?: string;
}