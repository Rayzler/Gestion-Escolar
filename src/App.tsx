import {Route, Switch} from "wouter";

export default function App() {
    return (
        <Switch>
            <Route path="/" component={() => (<div>Home</div>)}/>
            {/* Default route in a switch */}
            <Route>Page does not exists</Route>
        </Switch>
    );
}
