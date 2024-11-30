import {useEffect, useState} from "react";
import {useStore} from "../context/useStore.ts";
import {IGrade} from "../interfaces/IGrade.ts";

interface SubjectTableProps {
    idStudent: number;
}

export function SubjectTable({idStudent}: SubjectTableProps) {
    const grades = useStore(state => state.grades);
    const studentGrades = grades.filter(grade => grade.alumno.matricula === idStudent);
    const editGrade = useStore(state => state.editGrade);
    const deleteGrade = useStore(state => state.deleteGrade);

    const [editingSubject, setEditingSubject] = useState<number | null>(null);
    const [newGrade, setNewGrade] = useState("");

    const [actualGrade, setActualGrade] = useState<IGrade | null>(null);

    const handleEditClick = (grade: IGrade) => {
        setEditingSubject(grade.id);
        setNewGrade(grade.calificacion.toString());
        setActualGrade(grade);
    };

    const handleSaveClick = (gradeId: number) => {
        editGrade(gradeId, Number(newGrade));
        setEditingSubject(null);
        setNewGrade("");
        setActualGrade(null);
    };

    useEffect(() => {
        if (actualGrade) {
            const input = document.getElementById(`grade-${actualGrade.id}`) as HTMLInputElement;
            input?.focus();
        }
    }, [actualGrade]);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-white">
                <thead>
                <tr className="bg-gray-700">
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Materia</th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Calificación</th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider w-96">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {studentGrades.map((grade) => (
                    <tr key={grade.id} className="bg-gray-800 hover:bg-gray-700/50">
                        <td className="px-6 py-4 text-center whitespace-nowrap">{grade.materia.nombre}</td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                            <input
                                id={`grade-${grade.id}`}
                                type="number"
                                value={editingSubject === grade.id ? newGrade : grade.calificacion}
                                onChange={(e) => setNewGrade(e.target.value)}
                                className="bg-gray-700 text-white px-2 py-1 rounded w-full text-center"
                                readOnly={editingSubject !== grade.id}
                                disabled={editingSubject !== grade.id}
                                min={0}
                                max={10}
                            />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap gap-3 flex justify-center w-96">
                            {editingSubject === grade.id ? (
                                <button
                                    onClick={() => handleSaveClick(grade.id)}
                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                                >
                                    Guardar
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEditClick(grade)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                                >
                                    Editar
                                </button>
                            )}
                            <button
                                onClick={() => deleteGrade(grade.id)}
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
