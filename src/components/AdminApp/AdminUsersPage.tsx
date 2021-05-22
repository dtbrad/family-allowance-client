import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import useDidMount from "hooks/useDidMount";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import {selectUsers, selectUsersInitializationStatus} from "slices/users/usersSelectors";
import {initializeUsers} from "slices/users/usersThunks";
import {AsyncStatus, User} from "types";
import "./AdminUsersPage.less";

const formatNum = (num: number) => num?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
});

function AdminUsersTable() {
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

    const headers = ["Name", "Balance", "Allowance", "Day"];

    const rows = users.map((user: User) => (
        <tr data-testid="admin-users-table-row" key={user.userId}>
            <td>
                <Link
                    data-testid="admin-user-summary-link"
                    to={`users/${user.userId}`}
                >
                    {user.userId}
                </Link>
            </td>
            <td>{formatNum(user.balance)}</td>
            <td>{formatNum(user.allowanceAmount)}</td>
            <td>{user.dayPreference}</td>
        </tr>
    ));

    return (
        <div className="admin-users-page" data-testid="admin-users-page">
            <h1 className="admin-users-page__title">Users</h1>
            <Table
                size="md"
                bordered
                className="admin-users-page__table"
            >
                <thead>
                    <tr>
                        {headers.map((header) => <th key={header}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </div>
    );
}

export default AdminUsersTable;
