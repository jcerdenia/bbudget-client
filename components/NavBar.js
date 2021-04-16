import { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';

export default () => {
	return (
		<Fragment>
			<Navbar bg="dark" expand="lg" fixed="top" variant="dark">
				<Link href="/">
					<a className="navbar-brand">APP NAME</a>
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse className="basic-navbar-nav">
					<Nav className="mr-auto">
						<Link href="/">
							<a className="nav-link">Register</a>
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Fragment>
	);
}