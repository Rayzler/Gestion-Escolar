import {useState, useEffect, FormEvent} from "react";
import {IStudent} from "../interfaces/IStudent.ts";

interface StudentFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (student: IStudent) => void;
    student?: IStudent;
}

export function StudentFormModal({isOpen, onClose, onSubmit, student}: StudentFormModalProps) {
    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");

    useEffect(() => {
        if (student) {
            setNombre(student.nombre);
            setEdad(student.edad.toString());
        } else {
            setNombre("");
            setEdad("");
        }
    }, [student]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({
            matricula: student?.matricula || 0,
            nombre,
            edad: parseInt(edad, 10),
            materias: student?.materias || []
        });
        setNombre("");
        setEdad("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-white">
                    {student ? "Editar Estudiante" : "Agregar Estudiante"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="mt-1 px-4 py-2 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-300">
                            Edad
                        </label>
                        <input
                            type="number"
                            id="age"
                            value={edad}
                            onChange={(e) => setEdad(e.target.value)}
                            className="mt-1 px-4 py-2 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {student ? "Guardar Cambios" : "Agregar Estudiante"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
