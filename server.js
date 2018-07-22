const express = require('express');
const app = express()
const reg = require('./scrape/reg-number')
const predictPrice = require('./script/main')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}));


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
});

app.get('/regNumberDetails', async (req, res) => {
    console.log(req.query.reg)
	res.send(await reg(req.query.reg))
 })

app.post('/predictPrice', async (req, res) => {
    console.log(req.body)
    res.send({price: await predictPrice(req.body)})
})


app.get('/a', async (req, res) => {
    console.log('called')
    res.send({price: 'sa'})
})



app.listen(4000, () => {
	console.log('Server running on port' + 4000)
})
