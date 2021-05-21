import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LogoutButton from "../common/LogoutButton";

export default function StandardNavBar() {
    return (
        <Navbar
            bg="dark"
            variant="dark"
            className="justify-content-between app-nav"
            expand="lg"
        >
            <Navbar.Brand>Allowance Tracker</Navbar.Brand>
            <Nav><LogoutButton /></Nav>
        </Navbar>
    );
}
