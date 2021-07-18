import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import useDidMount from "hooks/useDidMount";
import useDidUnmount from "hooks/useDidUnmount";
import {useParams} from "react-router-dom";
import {initializeUserDetail} from "slices/userDetail/userDetailThunks";
import {didResetUserDetailUpdateStatus} from "slices/userDetail/userDetailReducer";
import {TransactionEntriesTable} from "../../TransactionEntriesTable";
import {selectUserInitializationStatus} from "slices/userDetail/userDetailSelectors";
import {AsyncStatus} from "types";
import AdminUserDetailHeader from "./AdminUserDetailHeader";
import AdminUserDetailPageMessage from "./AdminUserDetailPageMessage";
import "./AdminUserDetailPage.less";

export default function AdminUserDetailPage() {
    const {userId} = useParams<{userId: string}>();
    const dispatch = useAppDispatch();
    useDidMount(() => dispatch(initializeUserDetail(userId)));
    useDidUnmount(() => dispatch(didResetUserDetailUpdateStatus()));

    const userDetailInitializationStatus = useAppSelector(selectUserInitializationStatus);

    if (userDetailInitializationStatus === AsyncStatus.pending) {
        return <h2>User Detail Loading...</h2>;
    }

    if (userDetailInitializationStatus !== AsyncStatus.resolved) {
        return null;
    }

    return (
        <div data-testid="admin-user-detail-page">
            <AdminUserDetailPageMessage />
            <AdminUserDetailHeader />
            <TransactionEntriesTable />
        </div>
    );
}
