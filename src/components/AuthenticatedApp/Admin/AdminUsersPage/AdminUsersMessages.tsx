import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import Alert from "react-bootstrap/Alert";
import {didResetUpdateUsersStatus} from "slices/users/usersReducer";
import {selectUsersUpdateStatus} from "slices/users/usersSelectors";
import {AsyncStatus} from "types";

export default function AdminUsersMessage() {
    const status = useAppSelector(selectUsersUpdateStatus);
    const dispatch = useAppDispatch();

    let message;

    if (status === AsyncStatus.resolved) {
        message = (
            <Alert
                show
                variant="success"
                dismissible
                onClose={() => dispatch(didResetUpdateUsersStatus())}
            >
                    User successfully added
            </Alert>
        );
    }

    if (status === AsyncStatus.rejected) {
        message = (
            <Alert
                show
                variant="danger"
                dismissible
                onClose={() => dispatch(didResetUpdateUsersStatus())}
            >
                Failed to create user. Please try again.
            </Alert>
        );
    }

    return (
        <div className="admin-users-page__alert-holder">
            {message}
        </div>
    );

}

