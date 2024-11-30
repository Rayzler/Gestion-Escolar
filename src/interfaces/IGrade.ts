import {ISubject} from "./ISubject.ts";
import {IStudent} from "./IStudent.ts";

export interface IGrade {
    id: number;
    alumno: IStudent;
    materia: ISubject;
    calificacion: number;
}
