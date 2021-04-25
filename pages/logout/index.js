import { useEffect, Fragment, useContext } from 'react'
import Router from 'next/router'
import View from '../../components/View'
import UserContext from '../../contexts/UserContext'
import styles from '../../styles/Home.module.css'

export default function Logout() {
	const { unsetUser } = useContext(UserContext)

	useEffect(() => {
		unsetUser()
		Router.push('/') // Redirect to login
	}, [])

	return (
		<View title="Log Out">
			<div  className={styles.main}>
			<h2 className="text-center" style={{'margin-bottom': '20px'}}><strong>Logging out...</strong></h2>
			<h4 className="text-center">You will be redirected back to the log in screen.</h4>
			</div>
		</View>
	)
}