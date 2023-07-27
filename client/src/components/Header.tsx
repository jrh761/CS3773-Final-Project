import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import ThemeToggler from './ThemeToggler';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      style={{ marginBottom: 50 }}
    >
      <Container>
        <Navbar.Brand href="/">Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/test-page">Test Page</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            {!user && <Nav.Link href="/login">Login</Nav.Link>}
            {!user && <Nav.Link href="/register">Register</Nav.Link>}
            {user && (
              <>
                <Navbar.Text>
                  Signed in as: <a href="">{user.username}</a>
                </Navbar.Text>
                <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>{' '}
                {/* Add sign out link */}
              </>
            )}
          </Nav>
          <ThemeToggler />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
