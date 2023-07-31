import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import ThemeToggler from './ThemeToggler';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const getStoredTheme = (): string | null => localStorage.getItem('theme');
  const setStoredTheme = (theme: string) =>
    localStorage.setItem('theme', theme);

  const getPreferredTheme = (): string =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  const applyTheme = (theme: string) => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  };

  const [theme, setTheme] = useState(
    () => getStoredTheme() || getPreferredTheme(),
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setStoredTheme(newTheme);
    setTheme(newTheme);
  };

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
          </Nav>
          <Nav>
            {!user && <Nav.Link href="/login">Login</Nav.Link>}
            {!user && <Nav.Link href="/register">Register</Nav.Link>}
          </Nav>
          {user && (
            <Nav>
              <Navbar.Text className="px-3">
                User: <strong>{user.username}</strong>
              </Navbar.Text>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item href="/add-product">
                  Add product
                </NavDropdown.Item>
                <NavDropdown.Item href="/add-discount-code">
                  Add discount
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Sign Out
                </NavDropdown.Item>
                <div className="p-2">
                  <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
                </div>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
