import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import {IStudent} from "../interfaces/IStudent.ts";

interface StoreProps {
    nextStudentId: number;
    students: IStudent[];
    addStudent: (student: IStudent) => void;
    editStudent: (id: number, student: IStudent) => void;
    deleteStudent: (id: number) => void;
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
    }))
}), {
    name: "store",
    storage: createJSONStorage(() => localStorage)
}));
