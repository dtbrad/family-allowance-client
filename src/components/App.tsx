import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import useDidMount from "hooks/useDidMount";
import {lazy, Suspense} from "react";
import {selectInitializationStatus, selectIsLoggedIn, selectUserRole} from "slices/appStatus/appStatusSelectors";
import {initializeApp} from "slices/appStatus/appStatusThunks";
import {AsyncStatus, Role} from "types";
import "./App.less";
import {LoginPage} from "./LoginPage";

const AdminApp = lazy(() =>
    import("components/AdminApp").then((module) => ({
        default: module.AdminApp
    })));

const StandardApp = lazy(() =>
    import("components/StandardApp").then((module) => ({
        default: module.StandardApp
    })));

export default function App() {
    const dispatch = useAppDispatch();
    const initializationStatus = useAppSelector(selectInitializationStatus);
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const role = useAppSelector(selectUserRole);

    useDidMount(() => dispatch(initializeApp()));

    if (initializationStatus !== AsyncStatus.resolved) {
        return <p>Loading...</p>;
    }

    if (initializationStatus === AsyncStatus.resolved && !isLoggedIn) {
        return <LoginPage />;
    }

    if (initializationStatus === AsyncStatus.resolved && isLoggedIn) {
        const content = role === Role.admin
            ? <AdminApp />
            : <StandardApp />;

        return (
            <Suspense fallback={<div>Loading...</div>}>
                {content}
            </Suspense>
        );
    }

    return null;
}
