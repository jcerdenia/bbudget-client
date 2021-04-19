	import { Container } from 'react-bootstrap';
	import { Fragment } from 'react';
	import styles from '../styles/Sidebar.module.css'
	import { Button } from 'react-bootstrap';
	import { Navbar, Nav, Card } from 'react-bootstrap';
	import Link from 'next/link';

	export default function SideBar() {
		return (
			<div id="side-nav" >
				<Nav defaultActiveKey="/home" className="flex-column">
					<Button href="/">Add Category</Button>
					<Nav.Link href="/home">Active</Nav.Link>
					<Nav.Link eventKey="link-1">Link</Nav.Link>
					<Nav.Link eventKey="link-2">Link</Nav.Link>
					<Nav.Link eventKey="disabled" disabled>
						Disabled
					</Nav.Link>
				</Nav>
			</div>
		);
	}