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

const searchrivertablefn = pug.compileFile('views/searchrivertable.pug');

function postExtractBody(req,callback){
	const { headers, method, url } = req;
	let body = [];
	req.on('error', (err) => {
		console.error(err);
	}).on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		body = Buffer.concat(body).toString();
		body = JSON.parse(body);
		callback(body);
	});
}

app.get('/', (req, res) => {
	// console.log(raeda.lakeMyOpenBids());
	res.render('index',{
		openbids: raeda.lakeMyOpenBids(),
		openposts: raeda.lakeMyOpenPosts()
	});
});

app.get('/profile', (req, res) => {
	res.render('profile');
});

app.get('/createpost', (req, res) => {
	res.render('createpost');
});

app.get('/bid', (req, res) => {
	let bids = raeda.lakeGetBids('1')[0].bidPrice;
	res.render('bid',{bids:bids});
});

app.post('/api/lakelogin', (req, res) => {
	postExtractBody(req,(body)=>{
		console.log(body);
		res.send(JSON.stringify({success:false,profileid:10}));
	});
});

app.post('/api/accept_bid', (req, res) => {
	res.send('eg. accepted bid success');
});

app.get('/messenger', (req, res) => {
	raeda.getMessages('0x02','0x01').then((rust_res)=>{
		let txt = 'From: ' + rust_res['from'] + ' – To: ' + rust_res['to'] + ' – Msg: ' + rust_res['msg'];
		res.render('messenger',{res:txt});
	});
});

app.post('/api/post_message', (req, res) => {
	raeda.postMessage('0x02','0x01','really cool msg').then((rust_res)=>{
		let txt = 'From: ' + rust_res['from'] + ' – To: ' + rust_res['to'] + ' – Msg: ' + rust_res['msg'];
		res.send(txt);
	});
});

app.post('/api/lake-simple-search', (req, res) => {
	postExtractBody(req,(body)=>{
		raeda.lakeSimpleSearch(body['lat'],body['lng'],body['radius'],body['minprice'],body['maxprice']).then((search_res)=>{
			console.log(search_res)
			res.send(searchrivertablefn({searchresults:search_res}));
		});
	});
});

app.get('/favicon', (req, res) => {
	res.send('no favicon yet');
})

server.listen(port);