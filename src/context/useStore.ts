import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import {IStudent} from "../interfaces/IStudent.ts";
import {ISubject} from "../interfaces/ISubject.ts";
import {IGrade} from "../interfaces/IGrade.ts";

interface StoreProps {
    nextStudentId: number;
    students: IStudent[];
    addStudent: (student: IStudent) => void;
    editStudent: (id: number, student: IStudent) => void;
    deleteStudent: (id: number) => void;
    nextSubjectId: number;
    subjects: ISubject[];
    addSubject: (subject: ISubject) => void;
    editSubject: (id: number, subject: ISubject) => void;
    deleteSubject: (id: number) => void;
    nextGradeId: number;
    grades: IGrade[];
    addGrade: (idStudent: number, idSubject: number) => void;
    editGrade: (idGrade: number, grade: number) => void;
    deleteGrade: (id: number) => void;
}

const initialStudents: IStudent[] = [
    {
        matricula: 1,
        nombre: "Alice Johnson",
        edad: 18,
        materias: []
    },
    {
        matricula: 2,
        nombre: "Bob Smith",
        edad: 19,
        materias: []
    },
    {
        matricula: 3,
        nombre: "Charlie Brown",
        edad: 20,
        materias: []
    }
];

const initialSubjects: ISubject[] = [
    {id: 1, nombre: "Matemáticas"},
    {id: 2, nombre: "Ciencias"},
    {id: 3, nombre: "Historia"}
];

export const useStore = create(persist<StoreProps>((set) => ({
    nextStudentId: 4,
    students: initialStudents,
    addStudent: (student) => set(state => {
        const newStudent = {...student, matricula: state.nextStudentId};
        return {
            students: [...state.students, newStudent],
            nextStudentId: state.nextStudentId + 1
        };
    }),
    editStudent: (id, student) => set(state => ({
        students: state.students.map(s => s.matricula === id ? student : s)
    })),
    deleteStudent: (id) => set(state => ({
        students: state.students.filter(s => s.matricula !== id)
    })),
    nextSubjectId: 4,
    subjects: initialSubjects,
    addSubject: (subject) => set(state => {
        const newSubject = {...subject, id: state.nextSubjectId};
        return {
            subjects: [...state.subjects, newSubject],
            nextSubjectId: state.nextSubjectId + 1
        };
    }),
    editSubject: (id, subject) => set(state => ({
        subjects: state.subjects.map(s => s.id === id ? subject : s)
    })),
    deleteSubject: (id) => set(state => ({
        subjects: state.subjects.filter(s => s.id !== id)
    })),
    nextGradeId: 1,
    grades: [],
    addGrade: (idStudent, idSubject) => set(state => {
        const newGrade: IGrade = {
            id: state.nextGradeId,
            alumno: state.students.find(s => s.matricula === idStudent)!,
            materia: state.subjects.find(s => s.id === idSubject)!,
            calificacion: 0
        };
        return {
            grades: [...state.grades, newGrade],
            nextGradeId: state.nextGradeId + 1
        };
    }),
    editGrade: (idGrade, grade) => set(state => ({
        grades: state.grades.map(g => g.id === idGrade
            ? {...g, calificacion: grade}
            : g
        )
    })),
    deleteGrade: (id) => set(state => ({
        grades: state.grades.filter(g => g.id !== id)
    }))
}), {
    name: "store",
    storage: createJSONStorage(() => localStorage)
}));
