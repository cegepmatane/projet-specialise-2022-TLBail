import { Container, Alert, Navbar, Nav, Row } from 'react-bootstrap'
import logo from '../logo.svg'
import { Link, NavLink } from 'react-router-dom'

function Header() {
    return (
        <Navbar bg="dark" expand="lg" variant="dark" sticky="top" className='shadow'>
            <Container fluid >
                <Navbar.Brand>
                    <img className='navbarBrandImg' src={logo} alt="logo" />
                    <Link to="/" className="linkNavBar">
                        goldenGames
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className='flex-grow-0 justify-content-end'>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}

                        navbarScroll
                    >
                        <StyleNavLink link="/about" text="about" />
                        <StyleNavLink link="/contact" text="contact" />
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );


}

function StyleNavLink({ link, text }) {

    return (
        <Link className='linkNavBar' to={link} >
            {text}
        </Link>
    );
}

export default Header;