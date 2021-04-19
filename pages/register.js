import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import Router from 'next/router'
import Swal from 'sweetalert2'

export default function Register() {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [mobileNo, setMobileNo] = useState(0)
	const [password1, setPassword1] = useState("")
	const [password2, setPassword2] = useState("")

	const [isActive, setIsActive] = useState(true)

	// Run change after every user input
	useEffect(() => {
		if((firstName !== '' && lastName !== '' && email !== '' && mobileNo !== '' && password1 !== '' && password2 !== '') && (mobileNo.length === 11)) {
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [firstName, lastName, email, mobileNo, password1, password2])

	function registerUser(e) {
		e.preventDefault()
		fetch('https://aqueous-atoll-99638.herokuapp.com/api/users/email-exists', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email })
		})
		.then((res) => res.json())
		.then((data) => {
			if (data === false) {
				// Allow registration
				fetch('https://aqueous-atoll-99638.herokuapp.com/api/users/register', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: email,
						mobileNo: mobileNo,
						password: password1
					})
				})
				.then((res) => res.json())
				.then((data) => {
					if (data === true) {
						Swal.fire({
							icon: "success",
							title: "Successfully registered",
							text: "Thank you for registering."
						})
						// Redirect to login page
						Router.push('/')
					} else {
						Swal.fire({
							icon: "error",
							title: "Registration failed",
							text: "Something went wrong."
						})
					}
				})
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Registration failed',
					text: 'That email address is already in use.'
				})
			}
		})
	}

   return (
		<>
			<h1 className="mt-5 pt-5 text-center">Register</h1>
			<Form onSubmit={(e) => registerUser(e)} className="mb-3">
				<Form.Group controlId="userFirstName">
					<Form.Label>First Name</Form.Label>
					<Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
				</Form.Group>

				<Form.Group controlId="userLastName">
					<Form.Label>Last Name</Form.Label>
					<Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required/>
				</Form.Group>

				<Form.Group controlId="userEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} required/>
				</Form.Group>

				<Form.Group controlId="mobileNo">
					<Form.Label>Mobile Number</Form.Label>
					<Form.Control type="number" placeholder="Enter Mobile No." value={mobileNo} onChange={e => setMobileNo(e.target.value)} required/>
				</Form.Group>

				<Form.Group controlId="password1">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Enter Password" value={password1} onChange={e => setPassword1(e.target.value)} required/>
				</Form.Group>

				<Form.Group controlId="password2">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control type="password" placeholder="Confirm Password" value={password2} onChange={e => setPassword2(e.target.value)} required/>
				</Form.Group>

				
				{ (isActive) ?
						<Button variant="primary" type="submit">Register</Button>
					:
						<Button variant="primary" disabled>Register</Button>
				}
				
			</Form>
		</>
		) 
}
