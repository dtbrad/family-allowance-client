import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import useDidMount from "hooks/useDidMount";
import useDidUnMount from "hooks/useDidUnmount";
import {useParams} from "react-router-dom";
import {didResetUserUpdate} from "slices/userDetail/userDetailReducer";
import {selectUserInitializationStatus} from "slices/userDetail/userDetailSelectors";
import {initializeUserSummary} from "slices/userDetail/userDetailThunks";
import {AsyncStatus} from "types";
import {TransactionEntriesTable} from "../common";
import AdminUserDetailHeader from "./AdminUserDetailHeader";
import "./AdminUserDetailPage.less";
import AdminUserDetailPageMessage from "./AdminUserDetailPageMessage";

export default function AdminUserDetailPage() {
    const {userId} = useParams<{userId: string}>();
    const dispatch = useAppDispatch();
    useDidMount(() => dispatch(initializeUserSummary(userId)));
    useDidUnMount(() => dispatch(didResetUserUpdate()));

    const userDetailInitializationStatus = useAppSelector(selectUserInitializationStatus);

    if (userDetailInitializationStatus === AsyncStatus.pending) {
        return <h2>User Detail Loading...</h2>;
    }

    if (userDetailInitializationStatus !== AsyncStatus.resolved) {
        return null;
    }

    return (
        <div className="admin-user-detail-page">
            <AdminUserDetailPageMessage />
            <AdminUserDetailHeader />
            <TransactionEntriesTable />
        </div>
    );
}
