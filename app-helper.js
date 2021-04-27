const hostedUrl = "https://aqueous-atoll-99638.herokuapp.com"
const localUrl = "http://localhost:4000"

module.exports = {
	getAccessToken: () => localStorage.getItem('token'),
	getRandomColor: () => "#" + Math.floor(Math.random()*16777215).toString(16),
	apiBaseUrl: hostedUrl
}