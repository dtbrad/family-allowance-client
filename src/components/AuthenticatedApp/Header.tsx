import {useAppSelector} from "hooks/reduxHooks";
import {Nav, Navbar} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import {
    selectAuthenticatedUserId,
    selectAuthenticatedUserRole
} from "slices/appStatus/appStatusSelectors";
import {Role} from "types";
import LogoutButton from "./LogoutButton";

export default function Header() {
    const userRole = useAppSelector(selectAuthenticatedUserRole);
    const userId = useAppSelector(selectAuthenticatedUserId);
    const {pathname} = useLocation();

    const titleMap = new Map([
        [Role.admin, "Allowance Admin Controls"],
        [Role.standard, `${userId}'s allowance tracker`],
        [undefined, "Allowance App"]
    ]);

    const usersLink = userRole === Role.admin && pathname !== "/admin/users"
        ? <Nav.Link as={NavLink} to="/admin/users" data-testid="users-link">View Users</Nav.Link>
        : null;

    return (
        <Navbar bg="dark"
            variant="dark"
            expand="md">
            <Navbar.Brand>{titleMap.get(userRole)}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {usersLink}
                </Nav>
                <Nav><LogoutButton /></Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
