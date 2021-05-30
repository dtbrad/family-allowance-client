import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import Alert from "react-bootstrap/Alert";
import {didResetUsersUpate} from "slices/users/usersReducer";
import {selectUpdateUsersStatus} from "slices/users/usersSelectors";
import {AsyncStatus} from "types";

export default function AdminUsersMessage() {
    const status = useAppSelector(selectUpdateUsersStatus);
    const dispatch = useAppDispatch();

    let message;

    if (status === AsyncStatus.resolved) {
        message = (
            <Alert
                show
                variant="success"
                dismissible
                onClose={() => dispatch(didResetUsersUpate())}
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
            >
                Failed to create user. Please try again.
            </Alert>
        );
    }

    return (
        <div className="admin-users-page__message">
            {message}
        </div>
    );

}

