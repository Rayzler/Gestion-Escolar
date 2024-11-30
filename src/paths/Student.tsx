import {useParams} from "wouter";
import {useStore} from "../context/useStore.ts";
import {Navbar} from "../components/Navbar.tsx";
import {SubjectTable} from "../components/SubjectTable.tsx";
import {AttachSubjectModal} from "../components/AttachSubjectModal.tsx";
import {useState} from "react";

export default function StudentView() {
    const params = useParams();
    const student = useStore(state => state.students.find(student => student.matricula === Number(params.id))!);
    const subjects = useStore(state => state.subjects);
    const grades = useStore(state => state.grades);
    const addGrade = useStore(state => state.addGrade);
    const availableSubjects = subjects.filter(subject => !grades.some(grade => grade.materia.id === subject.id && grade.alumno.matricula === student.matricula));

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAttachSubject = (subjectId: number) => {
        addGrade(student.matricula, subjectId);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar/>
            <main className="container mx-auto px-4 py-8">
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                    <h1 className="text-3xl font-bold text-white mb-4">{student.nombre}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                        <div>
                            <p><span className="font-semibold">Matrícula:</span> {student.matricula}</p>
                        </div>
                        <div>
                            <p><span className="font-semibold">Edad:</span> {student.edad}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-white">Materias</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                            disabled={availableSubjects.length === 0}
                        >
                            Agregar Materia
                        </button>
                    </div>
                    <SubjectTable idStudent={student.matricula}/>
                </div>
            </main>
            <AttachSubjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAttach={handleAttachSubject} availableSubjects={availableSubjects}/>
        </div>
    );
}

