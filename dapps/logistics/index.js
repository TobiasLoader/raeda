const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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
});

app.get('/profile', (req, res) => {
	res.render('profile');
});

app.get('/bid', (req, res) => {
	res.render('bid');
});

app.post('/accept_bid', (req, res) => {
	res.send('eg. accepted bid success');
});

app.get('/messenger', (req, res) => {
	raedaAPICall('messages',{'from':'0x02','to':'0x01'}).then((rust_res)=>{
		let txt = 'From: ' + rust_res['from'] + ' – To: ' + rust_res['to'] + ' – Msg: ' + rust_res['msg'];
		res.render('messenger',{res:txt});
	});
});

app.post('/post_message', (req, res) => {
	raedaAPICall('message',{from:'0x02',to:'0x01', msg:"some msg"}).then((rust_res)=>{
		let txt = 'From: ' + rust_res['from'] + ' – To: ' + rust_res['to'] + ' – Msg: ' + rust_res['msg'];
		res.send(txt);
	});
});

app.get('/favicon', (req, res) => {
	res.send('no favicon yet');
})

server.listen(port);