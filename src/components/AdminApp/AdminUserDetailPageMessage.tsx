import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import Alert from "react-bootstrap/Alert";
import {didResetUserUpdate} from "slices/userDetail/userDetailReducer";
import {selectUpdateUserStatus} from "slices/userDetail/userDetailSelectors";
import {AsyncStatus} from "types";

export default function AdminUserDefaultPageMessage() {
    const updateUserDetailStatus = useAppSelector(selectUpdateUserStatus);
    const dispatch = useAppDispatch();

    if (updateUserDetailStatus === AsyncStatus.resolved) {
        return (
            <div className="admin-user-detail-page__message">
                <Alert
                    show
                    variant="success"
                    dismissible
                    onClose={() => dispatch(didResetUserUpdate())}
                >
                    Transaction successfully uploaded
                </Alert>
            </div>
        );
    }

    if (updateUserDetailStatus === AsyncStatus.rejected) {
        return (
            <div className="admin-user-detail-page__message">
                <Alert
                    show
                    variant="danger"
                >
                Transaction failed to upload. Please try again.
                </Alert>
            </div>
        );
    }

    return null;
}

