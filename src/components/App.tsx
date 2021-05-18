import {AdminApp} from "components/AdminApp";
import {StandardApp} from "components/StandardApp";
import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import useDidMount from "hooks/useDidMount";
import {selectInitializationStatus, selectIsLoggedIn, selectUserRole} from "slices/appStatus/appStatusSelectors";
import {initializeApp} from "slices/appStatus/appStatusThunks";
import {AsyncStatus, Role} from "types";
import "./App.less";
import {LoginPage} from "./LoginPage";

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

    if (initializationStatus === AsyncStatus.resolved && role === Role.standard) {
        return <StandardApp />;
    }

    if (initializationStatus === AsyncStatus.resolved && role === Role.admin) {
        return <AdminApp />;
    }

    return null;
}
