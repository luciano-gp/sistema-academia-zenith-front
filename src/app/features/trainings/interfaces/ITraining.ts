import { IExercise } from "../../exercises/interfaces/IExercise";

export interface ITrainingExerciseConfig extends Omit<IExercise, 'id' | 'nome'> {}

export interface ITraining {
    id?: number;
    descricao: string;
    exercicios?: ITrainingExerciseConfig[];
}