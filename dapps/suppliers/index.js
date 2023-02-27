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

// raeda package
const raeda = require('./../../core/raeda-node');
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/profile', (req, res) => {
	res.render('profile');
});

app.get('/bid', (req, res) => {
	let bids = raeda.lakeGetBids('1')[0].bidPrice;
	res.render('bid',{bids:bids});
});

app.post('/accept_bid', (req, res) => {
	res.send('eg. accepted bid success');
});

app.get('/messenger', (req, res) => {
	raeda.getMessages('0x02','0x01').then((rust_res)=>{
		let txt = 'From: ' + rust_res['from'] + ' – To: ' + rust_res['to'] + ' – Msg: ' + rust_res['msg'];
		res.render('messenger',{res:txt});
	});
});

app.post('/post_message', (req, res) => {
	raeda.postMessage('0x02','0x01','really cool msg').then((rust_res)=>{
		let txt = 'From: ' + rust_res['from'] + ' – To: ' + rust_res['to'] + ' – Msg: ' + rust_res['msg'];
		res.send(txt);
	});
});

app.get('/favicon', (req, res) => {
	res.send('no favicon yet');
})

server.listen(port);