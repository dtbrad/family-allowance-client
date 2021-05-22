import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import NavBar from "./StandardNavBar";
import StandardUserPage from "./StandardUserPage";

export default function StandardApp() {
    return (
        <BrowserRouter>
            <div className="standard-app" data-testid="standard-app">
                <NavBar />
                <Switch>
                    <Route path="/summary">
                        <StandardUserPage />
                    </Route>
                    <Route path="/"><Redirect to="/summary" /></Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}
