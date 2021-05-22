import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import {selectIsLoggedIn, selectLogoutLoadingStatus} from "slices/appStatus/appStatusSelectors";
import {logOutUser} from "slices/appStatus/appStatusThunks";
import {AsyncStatus} from "types";

export default function LogoutButton() {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const logoutLoadingStatus = useAppSelector(selectLogoutLoadingStatus);

    async function handleCLick() {
        await dispatch(logOutUser());
        history.push("/");
    }

    if (isLoggedIn) {
        return (
            <div className="logout-section">
                <Button
                    variant="light"
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
