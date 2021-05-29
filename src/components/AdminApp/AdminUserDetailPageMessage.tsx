import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import Alert from "react-bootstrap/Alert";
import {didResetUserUpdate} from "slices/userDetail/userDetailReducer";
import {selectUpdateUserStatus} from "slices/userDetail/userDetailSelectors";
import {AsyncStatus} from "types";

export default function AdminUserDefaultPageMessage() {
    const updateUserDetailStatus = useAppSelector(selectUpdateUserStatus);
    const dispatch = useAppDispatch();

    let message;

    if (updateUserDetailStatus === AsyncStatus.resolved) {
        message = (
            <Alert
                show
                variant="success"
                dismissible
                onClose={() => dispatch(didResetUserUpdate())}
            >
                    Transaction successfully uploaded
            </Alert>
        );
    }

    if (updateUserDetailStatus === AsyncStatus.rejected) {
        message = (
            <Alert
                show
                variant="danger"
            >
                Transaction failed to upload. Please try again.
            </Alert>
        );
    }

    return (
        <div className="admin-user-detail-page__message">
            {message}
        </div>
    );

}

