import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import useDidMount from "hooks/useDidMount";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import {selectUsersArray, selectUsersInitializationStatus} from "slices/users/usersSelectors";
import {initializeUsers} from "slices/users/usersThunks";
import {AsyncStatus, UserSummary} from "types";

const formatNum = (num: number) => num?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
});

export default function AdminUsersTable() {
    const dispatch = useAppDispatch();
    useDidMount(() => dispatch(initializeUsers()));
    const pageStatus = useAppSelector(selectUsersInitializationStatus);
    const users = useAppSelector(selectUsersArray);

    if (pageStatus !== AsyncStatus.resolved) {
        return <h2 className="usersLoading">Loading...</h2>;
    }

    if (!users || !users.length) {
        return (
            <Alert className="user-summary__error-message" variant="warning">
                There is no data for this user
            </Alert>
        );
    }

    const headers = ["Name", "Balance", "Allowance", "Day"];

    const rows = users.map((user: UserSummary) => (
        <tr key={user.userId} data-testid="user-summary-row">
            <td>
                <Link
                    to={`users/${user.userId}`}
                >
                    {user.userId}
                </Link>
            </td>
            <td data-testid="user-summary-balance">{formatNum(user.balance)}</td>
            <td>{formatNum(user.allowanceAmount)}</td>
            <td>{user.dayPreference}</td>
        </tr>
    ));

    return (
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
    );
}

