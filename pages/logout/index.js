import { useEffect, Fragment, useContext } from 'react'
import Router from 'next/router'
import View from '../../components/View'
import UserContext from '../../contexts/UserContext'

export default function Logout() {
	const { unsetUser } = useContext(UserContext)

	useEffect(() => {
		unsetUser()
		Router.push('/') // Redirect to login
	}, [])

	return (
		<View title="Log Out">
			<h5 className="text-center">Logging out...</h5>
			<h6 className="text-center">You will be redirected back to the log in screen.</h6>
		</View>
	)
}