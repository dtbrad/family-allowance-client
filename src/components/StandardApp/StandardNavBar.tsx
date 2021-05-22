import {useAppSelector} from "hooks/reduxHooks";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {selectUserId} from "slices/appStatus/appStatusSelectors";
import LogoutButton from "../common/LogoutButton";

export default function StandardNavBar() {
    const userId = useAppSelector(selectUserId);
    return (
        <Navbar
            bg="dark"
            variant="dark"
            className="justify-content-between app-nav"
            expand="lg"
        >
            <Navbar.Brand>{userId}'s allowance tracker</Navbar.Brand>
            <Nav><LogoutButton /></Nav>
        </Navbar>
    );
}
