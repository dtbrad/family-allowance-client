import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import useDidMount from "hooks/useDidMount";
import {
    selectAppInitializationStatus,
    selectAuthenticatedUser
} from "slices/appStatus/appStatusSelectors";
import {initializeApp} from "slices/appStatus/appStatusThunks";
import {AsyncStatus} from "types";
import AuthenticatedApp from "./AuthenticatedApp/AuthenticatedApp";
import {FullPageLoading} from "./FullPageLoading";
import {LoginPage} from "./LoginPage";

export default function App() {
    const dispatch = useAppDispatch();
    const appInitializationStatus = useAppSelector(selectAppInitializationStatus);
    const authenticatedUser = useAppSelector(selectAuthenticatedUser);

    useDidMount(() => dispatch(initializeApp()));

    // TODO: handle initialization failure
    if (appInitializationStatus === AsyncStatus.rejected) {
        return null;
    }

    if (appInitializationStatus === AsyncStatus.pending) {
        return (
            <div>
                <FullPageLoading message="Initializing App..." />
            </div>
        );
    }

    if (appInitializationStatus === AsyncStatus.resolved) {
        return authenticatedUser?.role
            ? <AuthenticatedApp />
            : <LoginPage />;
    }

    return null;
}
