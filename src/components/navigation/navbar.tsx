import { useCallback } from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLogout, useSession } from '../../contexts/AuthProvider';
import { User } from '../../api/user/model/user.model';


export default function NavigationBar() {
  const {isAuthed, user, hasRoles }: {token:string, isAuthed:boolean, user: User, hasRoles:string[]} = useSession();
  const logout = useLogout();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);


  return (
    <Navbar bg="dark" variant='dark' expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Game-Nerd</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer cy-data="navbar-games-link" to="/games">
              <Nav.Link>Games</Nav.Link>
              </LinkContainer>
            <LinkContainer cy-data="navbar-news-link" to="/news">
              <Nav.Link>News</Nav.Link>
              </LinkContainer>
            <LinkContainer cy-data="navbar-reviews-link" to="/reviews">
              <Nav.Link>Reviews</Nav.Link>
              </LinkContainer>
            {hasRoles.includes("ADMIN")?<LinkContainer to="/users">
              <Nav.Link cy-data="navbar-user-link">Users</Nav.Link>
              </LinkContainer> : null }  
          </Nav>
          <Nav>
            <NavDropdown cy-data="navbar-user-dropdown" title="User" id="basic-nav-dropdown">
              {isAuthed ? (<><NavDropdown.Item disabled cy-data="navbar-user-name" className="text-dark">
                Current user: {user.name}
                </NavDropdown.Item>
              <LinkContainer to={`/users/password/${user.id}`}>
                <NavDropdown.Item cy-data="navbar-button-change-password"> Change Password </NavDropdown.Item></LinkContainer>
                <NavDropdown.Item onClick={handleLogout} cy-data="navbar-button-logout"> Logout</NavDropdown.Item></>
              ) :
                (<><NavDropdown.Item cy-data="navbar-button-login" href="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item cy-data="navbar-button-register" href="/register">Register</NavDropdown.Item></>)}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

