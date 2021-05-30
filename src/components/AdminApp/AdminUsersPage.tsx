import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import useDidMount from "hooks/useDidMount";
import Alert from "react-bootstrap/Alert";
import {selectUsers, selectUsersInitializationStatus} from "slices/users/usersSelectors";
import {initializeUsers} from "slices/users/usersThunks";
import {AsyncStatus} from "types";
import "./AdminUsersPage.less";
import AdminUsersTable from "./AdminUsersTable";
import CreateUserForm from "./CreateUserForm";
import AdminUsersMessages from "./AdminUsersMessages";

export default function AdminUsersPage() {
    const dispatch = useAppDispatch();
    useDidMount(() => dispatch(initializeUsers()));
    const pageStatus = useAppSelector(selectUsersInitializationStatus);
    const users = useAppSelector(selectUsers);

    if (pageStatus !== AsyncStatus.resolved) {
        return <h2 className="usersLoading" data-testid="admin-users-loading">Loading...</h2>;
    }

    if (!users || !users.length) {
        return (
            <Alert className="user-summary__error-message" data-testid="admin-no-users-message" variant="warning">
                There is no data for this user
            </Alert>
        );
    }

    return (
        <div className="admin-users-page" data-testid="admin-users-page">
            <AdminUsersMessages />
            <h1 className="admin-users-page__title">Users</h1>
            <AdminUsersTable />
            <CreateUserForm />
        </div>
    );
}
