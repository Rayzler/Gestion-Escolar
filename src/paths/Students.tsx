import {Navbar} from "../components/Navbar.tsx";
import {StudentList} from "../components/StudentList.tsx";
import {useState} from "react";
import {StudentFormModal} from "../components/StudentFormModal.tsx";
import {useStore} from "../context/useStore.ts";
import {IStudent} from "../interfaces/IStudent.ts";

export default function StudentsView() {
    const students = useStore(state => state.students);
    const addStudent = useStore(state => state.addStudent);
    const editStudent = useStore(state => state.editStudent);
    const deleteStudent = useStore(state => state.deleteStudent);

    const [activeStudent, setActiveStudent] = useState<IStudent | undefined>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreate = () => {
        setIsModalOpen(true);
    };

    const handleEdit = (id: number) => {
        const student = students.find(student => student.matricula === id);
        setActiveStudent(student);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        deleteStudent(id);
    };

    const handleSubmit = (student: IStudent) => {
        const studentExists = students.some(s => s.matricula === student.matricula);
        if (studentExists) {
            editStudent(student.matricula, student);
        } else {
            addStudent(student);
        }
        handleClose();
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setActiveStudent(undefined);
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar/>
            <main className="container mx-auto px-4 py-8">
                <section id="students" className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-white text-2xl font-bold">Estudiantes</h2>
                        <button
                            onClick={handleCreate}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                        >
                            Agregar Estudiante
                        </button>
                    </div>
                    <StudentList students={students} handleDelete={handleDelete} handleEdit={handleEdit}/>
                </section>
            </main>
            <StudentFormModal student={activeStudent} isOpen={isModalOpen} onClose={handleClose}
                              onSubmit={handleSubmit}/>
        </div>
    );
}

