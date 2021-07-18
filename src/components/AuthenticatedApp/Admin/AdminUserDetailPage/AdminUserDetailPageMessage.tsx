import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import Alert from "react-bootstrap/Alert";
import {didResetUserDetailUpdateStatus} from "slices/userDetail/userDetailReducer";
import {selectUserDetailUpdateStatus} from "slices/userDetail/userDetailSelectors";
import {AsyncStatus} from "types";

export default function AdminUserDefaultPageMessage() {
    const updateUserDetailStatus = useAppSelector(selectUserDetailUpdateStatus);
    const dispatch = useAppDispatch();

    let message;

    if (updateUserDetailStatus === AsyncStatus.resolved) {
        message = (
            <Alert
                show
                variant="success"
                dismissible
                onClose={() => dispatch(didResetUserDetailUpdateStatus())}
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
                dismissible
                onClose={() => dispatch(didResetUserDetailUpdateStatus())}
            >
                Transaction failed to upload. Please try again.
            </Alert>
        );
    }

    return (
        <div className="admin-user-detail-page__alert-holder">
            {message}
        </div>
    );

}

