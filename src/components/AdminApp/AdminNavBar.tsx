import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {LogoutButton} from "../common";

export default function AdminNavBar() {
    return (
        <Navbar bg="dark"
            variant="dark"
            expand="md">
            <Navbar.Brand>Allowance Tracker Admin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link
                        data-testid="admin-users-link"
                        as={NavLink}
                        to="/users"
                    >
                        View Users
                    </Nav.Link>
                </Nav>
                <Nav><LogoutButton /></Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
