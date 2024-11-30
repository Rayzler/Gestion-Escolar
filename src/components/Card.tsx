import {useLocation} from "wouter";

interface CardProps {
    title: string;
    subtitle?: string;
    idStudent?: number;
    onEdit: () => void;
    onDelete: () => void;
}

export function Card({title, subtitle, idStudent, onEdit, onDelete}: CardProps) {
    const [, navigate] = useLocation();

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-white text-lg font-semibold mb-1">{title}</h3>
            {subtitle && <p className="text-gray-400 text-sm mb-2">{subtitle}</p>}
            <div className="flex justify-end space-x-2">
                <button
                    onClick={onEdit}
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition-colors"
                >Editar
                </button>
                <button
                    onClick={onDelete}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                >Eliminar
                </button>
                {
                    idStudent && (
                        <button
                            onClick={() => navigate(`/students/${idStudent}`)}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                        >Ver
                        </button>
                    )
                }
            </div>
        </div>
    );
}

