module.exports = {
	getAccessToken: () => localStorage.getItem('token'),
	getRandomColor: () => "#" + Math.floor(Math.random()*16777215).toString(16),
	apiBaseUrl: "http://localhost:4000"
}