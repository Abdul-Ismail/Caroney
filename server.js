const express = require('express');
const app = express()

app.get('/', (req, res) => {
	res.send('Whats up, from Nano')
 })

app.listen(3000, () => {
	console.log('Server running on port' + 3000)
})
