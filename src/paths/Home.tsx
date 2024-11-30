import {Navbar} from "../components/Navbar.tsx";

export default function HomeView() {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <Navbar/>
            <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Bienvenido al sistema de gestión escolar</h1>
                    <p className="text-xl">Este sistema te permitirá gestionar alumnos y materias.</p>
                </div>
            </main>
            <footer className="bg-gray-800 py-6 text-center">
                <p>&copy; 2024 Universidad La Salle Bajío</p>
            </footer>
        </div>
    );
}

