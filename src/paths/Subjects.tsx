import {Navbar} from "../components/Navbar.tsx";
import {SubjectList} from "../components/SubjectList.tsx";
import {useStore} from "../context/useStore.ts";
import {ISubject} from "../interfaces/ISubject.ts";
import {useState} from "react";
import {SubjectFormModal} from "../components/SubjectFormModal.tsx";

export default function SubjectsView() {
    const subjects = useStore(state => state.subjects);
    const addSubject = useStore(state => state.addSubject);
    const editSubject = useStore(state => state.editSubject);
    const deleteSubject = useStore(state => state.deleteSubject);

    const [activeSubject, setActiveSubject] = useState<ISubject | undefined>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreate = () => {
        setIsModalOpen(true);
    };

    const handleEdit = (id: number) => {
        const subject = subjects.find(subject => subject.id === id);
        setActiveSubject(subject);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        deleteSubject(id);
    };

    const handleSubmit = (subject: ISubject) => {
        const subjectExists = subjects.some(s => s.id === subject.id);
        if (subjectExists) {
            editSubject(subject.id, subject);
        } else {
            addSubject(subject);
        }
        handleClose();
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setActiveSubject(undefined);
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar/>
            <main className="container mx-auto px-4 py-8">
                <section id="subjects" className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-white text-2xl font-bold">Materias</h2>
                        <button
                            onClick={handleCreate}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                        >
                            Agregar Materia
                        </button>
                    </div>
                    <SubjectList subjects={subjects} handleEdit={handleEdit} handleDelete={handleDelete}/>
                </section>
            </main>
            <SubjectFormModal isOpen={isModalOpen} onClose={handleClose} onSubmit={handleSubmit}
                              subject={activeSubject}/>
        </div>
    );
}

