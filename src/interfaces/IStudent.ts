import {ISubject} from "./ISubject.ts";

export interface IStudent {
    matricula: number;
    nombre: string;
    edad: number;
    materias: ISubject[];
}
