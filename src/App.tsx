import {Route, Switch, useLocation} from "wouter";
import {useEffect} from "react";

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
            <Route path="/" component={() => (<div>Home</div>)}/>
            {/* Default route in a switch */}
            <Route>Page does not exists</Route>
        </Switch>
    );
}
