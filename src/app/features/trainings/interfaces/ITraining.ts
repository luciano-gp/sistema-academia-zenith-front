import { IExercise } from "../../exercises/interfaces/IExercise";
import { IExerciseTraining } from "./IExerciseTraining";

export interface ITrainingExerciseConfig extends Omit<IExercise, 'id' | 'nome'> {
    id?: number;
    _joinData?: IExerciseTraining;
}

export interface ITraining {
    id?: number;
    descricao: string;
    exercicio?: ITrainingExerciseConfig[];
}