import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import NavBar from "./AdminNavBar";
import AdminUserDetailPage from "./AdminUserDetailPage";
import AdminUsersPage from "./AdminUsersPage";

export default function AdminApp() {
    return (
        <BrowserRouter>
            <div data-testid="admin-app">
                <NavBar />
                <div>
                    <Switch>
                        <Route path="/users/:userId">
                            <AdminUserDetailPage />
                        </Route>
                        <Route path="/users">
                            <AdminUsersPage />
                        </Route>
                        <Route
                            path="/">
                            <Redirect to="/users" />
                        </Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}
