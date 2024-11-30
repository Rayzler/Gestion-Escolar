import {Route, Switch, useLocation} from "wouter";
import {useEffect} from "react";
import LoginView from "./paths/Login.tsx";
import StudentsView from "./paths/Students.tsx";

export default function App() {
    const [, navigate] = useLocation();
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    useEffect(() => {
        if (isAuthenticated !== "true") {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <Switch>
            <Route path="/" component={LoginView}/>
            <Route path="/students" component={StudentsView}/>
            {/* Default route in a switch */}
            <Route>Page does not exists</Route>
        </Switch>
    );
}
