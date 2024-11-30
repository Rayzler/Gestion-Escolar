import {useState} from "react";
import {ISubject} from "../interfaces/ISubject.ts";


interface AttachSubjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAttach: (subjectId: number) => void;
    availableSubjects: ISubject[];
}

export function AttachSubjectModal({isOpen, onClose, onAttach, availableSubjects}: AttachSubjectModalProps) {
    const [selectedSubject, setSelectedSubject] = useState<number | "">("");

    const handleAttach = () => {
        if (selectedSubject !== "") {
            onAttach(Number(selectedSubject));
            setSelectedSubject("");
            onClose();
        }
    };

    const handleClose = () => {
        setSelectedSubject("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-white mb-4">Agregar Materia</h2>
                <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value as number | "")}
                    className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                >
                    <option value="">Selecciona una materia</option>
                    {availableSubjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                            {subject.nombre}
                        </option>
                    ))}
                </select>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleAttach}
                        disabled={selectedSubject === ""}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Asignar
                    </button>
                </div>
            </div>
        </div>
    );
}

