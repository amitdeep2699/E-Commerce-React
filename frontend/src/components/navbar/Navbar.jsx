import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import {Link} from "react-router-dom";

function NavigationBar() {
  const Logout=()=>{
    localStorage.clear();
    window.location.reload();
  }
  return (
    <Navbar variant="dark" bg="dark" expand="md" sticky="top">
      <Container>
        <Navbar.Brand as={Link}  to="/">E-Commerce</Navbar.Brand>
        <Nav>
          <Nav.Link as={Link}  to="/">Home</Nav.Link>
          <Nav.Link  as={Link} to="/UserOrder">Order</Nav.Link>
          <Nav.Link as={Link} to="/Cart">Cart</Nav.Link>
          <Nav.Link as={Link} to="/ChangePassword">Change Password</Nav.Link>
          <Nav.Link  onClick={Logout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default NavigationBar;
