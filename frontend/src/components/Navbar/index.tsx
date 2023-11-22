import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slice/authSlice";
import { successToast } from "../../services/toaster.services";
import { IconButton } from "@mui/material";

function NavbarComponent() {
  const { name, role } = useSelector((state: any) => {
    return state.auth;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("persist:root");
    dispatch(logout());
    successToast("Logged out successfully");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" variant="light">
      <Container>
        <Link to={"/products"}>
          <Navbar.Brand>ECOMMERCE</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            {role === "user" && (
              <IconButton color="inherit" onClick={(e) => navigate("/cart")}>
                <BsFillCartCheckFill size="1.5rem" />
              </IconButton>
            )}
            <NavDropdown title={name} id="basic-nav-dropdown">
              <Button variant="secondary" className="w-100">
                Profile
              </Button>
              <Button
                variant="danger"
                className="w-100 mt-2"
                onClick={logoutHandler}
              >
                Log-Out
              </Button>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
