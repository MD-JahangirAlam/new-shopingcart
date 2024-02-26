import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { LuLogIn } from "react-icons/lu";
import { Link } from 'react-router-dom';

import { BsCartFill } from "react-icons/bs";
import { useSelector } from 'react-redux';

function NavBar() {

  const { cartAmaunt } = useSelector(state => state.userCart);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React <span>app</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
        <Link to='/usercarts' >
          <div className='m-2' style={{ position: 'relative', }}>
            <BsCartFill style={{ color: 'blue', fontSize: '30px' }} />
            <span style={{ position: 'absolute', borderRadius: '3px', top: '-6px', right: '2px', background: '#ffcd00', padding: '2px', fontSize: '12px' }}>
              {cartAmaunt}
            </span>
          </div>
        </Link>
        <Link to='userlogin' >
          <LuLogIn />
        </Link>
      </Container>
      {/* <div className="login">
        <Link to='userlogin'>
            <LuLogIn />
        </Link>
      </div> */}
    </Navbar>
  );
}

export default NavBar;