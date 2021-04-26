
import { Navbar, Nav, Button, Dropdown, NavItem, NavLink } from 'react-bootstrap'
import { Fragment, useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import UserContext from '../contexts/UserContext'


const chartsNavGroup = [ 
	'Monthly Expenses', 
	'Monthly Income', 
	'Trend', 
	'Category Breakdown'
].map((item) => {	
	const slug = item.trim().toLowerCase().replace(' ', '-');
	return (
		<Link href={`/user/charts/${slug}`}>
			<a className="nav-link">{item}</a>
		</Link>
	);
});

export default function AppNavBar() {
	const { user } = useContext(UserContext)
	const [isExpanded, setIsExpanded] = useState(false)

	let RightNavOptions;
	let LeftNavOptions;

	if (user.email !== null) {
		RightNavOptions = (
			<Nav className="justify-content-end" onClick={() => setIsExpanded(!isExpanded)}>
				<Nav.Item>
					<Nav.Link disabled>Logged in as: {user.email}</Nav.Link>
				</Nav.Item>
				<Link href="/logout">
					<a className="nav-link">Log Out</a>
				</Link>
			</Nav>
		)
		LeftNavOptions = (
			<>
			<Link href={`/user/records`}>
				<a className="nav-link">Records</a>
			</Link>

			{chartsNavGroup}
			</>
		)
	} else {
		RightNavOptions = 
			(
			<Nav className="justify-content-end" onClick={() => setIsExpanded(!isExpanded)}>
				<Nav.Item>
					<Button href="/register">Sign Up</Button>
				</Nav.Item>
			</Nav>
		)
		
		LeftNavOptions = null
	}

	return (
		<Fragment>
			<Navbar expanded={isExpanded} id="navbar" expand="lg" variant="dark" >
				<Link href="/">
					<a className="navbar-brand"><strong>bbudget</strong></a>
				</Link>
				<Navbar.Toggle onClick={() => setIsExpanded(!isExpanded)} aria-controls="basic-navbar-nav" />
				<Navbar.Collapse className="basic-navbar-nav">
					
					<Nav className="mr-auto" onClick={() => setIsExpanded(!isExpanded)} >
						{/* mainNavGroup */}
						{LeftNavOptions}
					</Nav>

					{/* <Nav className="justify-content-end" onClick={() => setIsExpanded(!isExpanded)} >
						
						<Nav.Item>
							<Button href="/register">Sign Up</Button>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href="/logout">Log In</Nav.Link>
						</Nav.Item>
					
						
					</Nav> */}
					{RightNavOptions}
				</Navbar.Collapse>
			</Navbar>
		</Fragment>
	);
}
