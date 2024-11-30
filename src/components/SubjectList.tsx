import {Card} from "./Card.tsx";
import {ISubject} from "../interfaces/ISubject.ts";

interface SubjectListProps {
    subjects: ISubject[];
    handleEdit: (id: number) => void;
    handleDelete: (id: number) => void;
}

export function SubjectList({subjects, handleEdit, handleDelete}: SubjectListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map(subject => (
                <Card
                    key={subject.id}
                    title={subject.nombre}
                    onEdit={() => handleEdit(subject.id)}
                    onDelete={() => handleDelete(subject.id)}
                />
            ))}
        </div>
    );
}

