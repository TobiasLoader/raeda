const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
// for Socket IO
// const { Server } = require("socket.io");
// const io = new Server(server);
const pug = require('pug');
app.use(express.static('public'));

app.set('views', './views')
app.set('view engine', 'pug');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.render('index');
})
app.get('/favicon', (req, res) => {
	res.send('no favicon yet');
})

server.listen(port);