import {Link, useLocation} from "wouter";

export function Navbar() {
    const [, navigate] = useLocation();

    function handleLogout() {
        localStorage.removeItem("isAuthenticated");
        navigate("/");
    }

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <p className="text-white text-2xl font-bold">Panel Escolar</p>
                <div className="space-x-4">
                    <Link to="/students" className="text-white hover:text-indigo-400">
                        Estudiantes
                    </Link>
                    <Link to="/subjects" className="text-white hover:text-indigo-400">
                        Materias
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

