
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Fragment } from 'react'
import Link from 'next/link'

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
			<Nav.Link href={`/${slug}`}>{item}</Nav.Link>
		</Nav.Item>
	);
});

export default function AppNavBar() {

	return (
		<Fragment>
			<Navbar id="navbar" expand="lg" variant="dark" sticky="top">
				<Link href="/">
					<a className="navbar-brand">bbudget</a>
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse className="basic-navbar-nav">
					
					<Nav className="mr-auto">
						{/* mainNavGroup */}
					</Nav>

					<Nav className="justify-content-end">
						<Nav.Item>
							<Button href="/register">Sign Up</Button>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href="/logout">Log In</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Fragment>
	);
}

