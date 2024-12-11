import { IExercise } from "../../exercises/interfaces/IExercise";
import { IExerciseTraining } from "./IExerciseTraining";

export interface ITrainingExerciseConfig extends Omit<IExercise, 'id' | 'nome'> {
    id?: number;
    nome?: string;
    _joinData?: IExerciseTraining;
}

export interface ITraining {
    id?: number;
    select?: boolean;
    descricao: string;
    exercicio?: ITrainingExerciseConfig[];
}