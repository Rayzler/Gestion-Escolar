import {Route, Switch, useLocation} from "wouter";
import {useEffect} from "react";
import LoginView from "./paths/Login.tsx";
import StudentsView from "./paths/Students.tsx";
import StudentView from "./paths/Student.tsx";
import SubjectsView from "./paths/Subjects.tsx";
import HomeView from "./paths/Home.tsx";

export default function App() {
    const [, navigate] = useLocation();
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    useEffect(() => {
        if (isAuthenticated !== "true") {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return (
        <Switch>
            <Route path="/" component={HomeView}/>
            <Route path="/login" component={LoginView}/>
            <Route path="/students" component={StudentsView}/>
            <Route path="/students/:id" component={StudentView}/>
            <Route path="/subjects" component={SubjectsView}/>
            {/* Default route in a switch */}
            <Route>Page does not exists</Route>
        </Switch>
    );
}
