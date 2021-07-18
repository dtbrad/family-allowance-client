import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import useDidMount from "hooks/useDidMount";
import Alert from "react-bootstrap/Alert";
import {selectUsersInitializationStatus} from "slices/users/usersSelectors";
import {initializeUsers} from "slices/users/usersThunks";
import {AsyncStatus} from "types";
import AdminUsersMessage from "./AdminUsersMessages";
import "./AdminUsersPage.less";
import AdminUsersTable from "./AdminUsersTable";
import CreateUserForm from "./CreateUserForm";

export default function AdminUsersPage() {
    const dispatch = useAppDispatch();
    useDidMount(() => dispatch(initializeUsers()));
    const pageStatus = useAppSelector(selectUsersInitializationStatus);

    // TODO: move to messages component
    if (pageStatus === AsyncStatus.rejected) {
        return (
            <Alert variant="danger">
            There was a problem fetching users. Please try reloading the page.
            </Alert>
        );
    }

    if (pageStatus !== AsyncStatus.resolved) {
        return <h2 className="usersLoading">Loading...</h2>;
    }

    return (
        <div className="admin-users-page" data-testid="admin-users-page">
            <AdminUsersMessage />
            <h1 className="admin-users-page__title">Users</h1>
            <AdminUsersTable />
            <CreateUserForm />
        </div>
    );
}
