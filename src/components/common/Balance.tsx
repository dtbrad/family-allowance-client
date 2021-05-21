import {useAppSelector} from "hooks/reduxHooks";
import {selectuserBalance, selectUserIdForSelectedUser} from "slices/userDetail/userDetailSelectors";

export default function Balance() {
    const balance = useAppSelector(selectuserBalance);
    const userId = useAppSelector(selectUserIdForSelectedUser);

    if (balance === undefined) {
        return null;
    }

    const formattedBalance = balance.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

    return <h2 className="user-summary__balance" >Current Balance for {userId}: {formattedBalance}</h2>;
}

