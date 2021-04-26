import { useState, useContext } from 'react'
import { Form, Button, Card, Row, Col, Container } from 'react-bootstrap'
import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import UserContext from '../contexts/UserContext'
import View from '../components/View'
import Swal from 'sweetalert2'

const BASE_URL = "http://localhost:4000"
//const BASE_URL = "https://aqueous-atoll-99638.herokuapp.com"

export default function Home() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { user, setUser } = useContext(UserContext)

	// Redirect to records if user is already found
	if (user.email !== null) Router.push('/user/records')

	function login(e) {
	 	e.preventDefault()
	 	// Send user email and password to endpoint
		fetch(`${BASE_URL}/api/users/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password
			})
		}).
		then((response) => response.json())
		.then((data) => {
			// Should receive an access token
			if (data) {
				localStorage.setItem('token', data.accessToken)
				retrieveUserDetails(data.accessToken)
				Swal.fire({
					icon: 'success',
					title: 'Successfully logged in.',
				})
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Failed to log in.',
					text: 'Incorrect user name and/or password.'
				})
			}
		})
	}

	function retrieveUserDetails(accessToken) {
		const options = { headers: { Authorization: `Bearer ${accessToken}` }}
		// Send access token to API endpoint
		fetch(`${BASE_URL}/api/users/details`, options)
		.then((response) => response.json())
		.then((data) => { 
			// Should receive user data
			if (data) setUser({ email: data.email })
			//Router.push('/user/records')
		})
	}

	return (
		<View title={'Log in'}>
			<Container style={{marginBottom: '50px'}}>
				<h1 className={styles.title}><strong>A better way to track your budget.</strong></h1>
			</Container>

			<div className={styles.loginFormContainer}>
				<h5 className="text-muted">Log in with your account information.</h5>
				<Form onSubmit={(e) => login(e)}>
					<Form.Group controlId="email">
						<Form.Label>Email:</Form.Label>
						<Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} required/>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>Password:</Form.Label>
						<Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
					</Form.Group>
					<Button type="submit" variant="primary" className="btn-block mb-3">Log In</Button>
				</Form>
				<p>Not yet registered? <Link href="/register">Sign up now.</Link></p>
			</div>
		</View>
	)
}