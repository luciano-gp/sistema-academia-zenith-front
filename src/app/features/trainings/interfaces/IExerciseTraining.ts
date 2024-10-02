import { IExercise } from "../../exercises/interfaces/IExercise";
import { ITraining } from "./ITraining";

export interface IExerciseTraining {
    exercicio: IExercise;
    treino: ITraining;
    num_series?: number;
    num_repeticoes?: number;
    carga?: number;
    observacao?: string;
}