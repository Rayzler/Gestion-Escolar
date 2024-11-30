import {Card} from "./Card.tsx";
import {IStudent} from "../interfaces/IStudent.ts";

interface StudentListProps {
    students: IStudent[];
    handleEdit: (id: number) => void;
    handleDelete: (id: number) => void;
}

export function StudentList({students, handleEdit, handleDelete}: StudentListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map(student => (
                <Card
                    key={student.matricula}
                    title={student.nombre}
                    subtitle={`Matrícula: ${student.matricula}`}
                    idStudent={student.matricula}
                    onEdit={() => handleEdit(student.matricula)}
                    onDelete={() => handleDelete(student.matricula)}
                />
            ))}
        </div>
    );
}

