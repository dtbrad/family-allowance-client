import StandardUserDetailPage from "./Standard/StandardUserDetailPage";
import {useAppSelector} from "hooks/reduxHooks";
import {Redirect, Route, Switch} from "react-router-dom";
import {selectAuthenticatedUser, selectLogoutLoadingStatus} from "slices/appStatus/appStatusSelectors";
import {AsyncStatus, Role} from "types";
import AdminUserDetailPage from "./Admin/AdminUserDetailPage";
import Header from "./Header";
import "./AuthenticatedApp.less";
import {AdminUsersPage} from "./Admin/AdminUsersPage";

export default function AuthenticatedApp() {
    const authenticatedUser = useAppSelector(selectAuthenticatedUser);
    const role = authenticatedUser?.role;
    const logoutLoadingStatus = useAppSelector(selectLogoutLoadingStatus);

    return (
        <div className="authenticated-app">
            <Header />
            {
                logoutLoadingStatus === AsyncStatus.pending
                    ? null
                    : (
                        <div className="authenticated-app__content">
                            <Switch>
                                <Route path="/admin/users/:userId">
                                    {role === Role.admin ? <AdminUserDetailPage /> : <Redirect to="/unknown" />}
                                </Route>
                                <Route path="/admin/users">
                                    {role === Role.admin ? <AdminUsersPage /> : <Redirect to="/unknown" />}
                                </Route>
                                <Route path="/summary">
                                    {role === Role.standard ? <StandardUserDetailPage /> : <AdminUserDetailPage />}
                                </Route>
                                <Route exact path="/">
                                    {role === Role.admin ? <Redirect to="/admin/users" /> : <Redirect to="/summary" />}
                                </Route>
                                <Route path="/unknown">
                                    <h1 data-testid="unknown-route">Looks like you're lost...</h1>
                                </Route>
                                <Route path="*">
                                    <Redirect to="/unknown" />
                                </Route>
                            </Switch>
                        </div>
                    )
            }
        </div>
    );
}
