import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import Button from "react-bootstrap/Button";
import {AsyncStatus} from "types";
import {logOutUser} from "slices/appStatus/appStatusThunks";
import {selectIsLoggedIn, selectLogoutLoadingStatus} from "slices/appStatus/appStatusSelectors";

export default function LogoutButton() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const logoutLoadingStatus = useAppSelector(selectLogoutLoadingStatus);

    async function handleCLick() {
        await dispatch(logOutUser());
    }

    if (isLoggedIn) {
        return (
            <div className="logout-section">
                <Button
                    disabled={logoutLoadingStatus === AsyncStatus.pending}
                    className="logout-button"
                    onClick={handleCLick}
                >
                    {logoutLoadingStatus === AsyncStatus.pending ? "Logging out..." : "Log Out"}
                </Button>
            </div>
        );
    }

    return null;
}
