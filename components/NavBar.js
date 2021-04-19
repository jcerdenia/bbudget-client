import { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';

const mainNavGroup = [
	'Categories', 
	'Records', 
	'Monthly Expenses', 
	'Monthly Income', 
	'Trend', 
	'Breakdown'
].map((item) => {	
	const slug = item.trim().toLowerCase().replace(' ', '-');
	return (
		<Nav.Item>
			<Nav.Link href={`/${slug}`}>
				{item}
			</Nav.Link>
		</Nav.Item>
	);
});

export default function AppNavBar() {
	return (
		<Fragment>
			<Navbar bg="dark" expand="lg" variant="dark" sticky="top">
				<Link href="/">
					<a className="navbar-brand">Budget Tracker</a>
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse className="basic-navbar-nav">
					
					<Nav className="mr-auto">
						{mainNavGroup}
					</Nav>

					<Nav className="justify-content-end">
						<Nav.Item>
							<Nav.Link href="/logout">Log Out</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Fragment>
	);
}

