const fs = require('fs');
// let sessions = JSON.parse(fs.readFileSync('./sessions.json', 'utf8'));
let sessions = {}

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const pug = require('pug');
app.use(express.static('public'));

const cors = require('cors');
app.use(cors({
	origin: ['http://localhost:3000'],
	methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

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
	res.render('index',{
		openbids: raeda.lakeMyOpenBids(),
		openposts: raeda.lakeMyOpenPosts()
	});
});

app.get('/profile', (req, res) => {
	res.render('profile');
});

app.get('/newpost', (req, res) => {
	res.render('newpost');
});

app.get('/signup', (req, res) => {
	res.render('signup');
});

app.get('/advancedsearch', (req, res) => {
	res.render('advancedsearch');
});


app.get('/bid', (req, res) => {
	let bids = raeda.lakeGetBids('1')[0].bidPrice;
	res.render('bid',{bids:bids});
});

app.post('/api/lakelogin', (req, res) => {
	postExtractBody(req,(body)=>{
		console.log(body);
		let sessionid = 100000 + Math.floor(Math.random()*900000);
		sessions[body.addr] = {profilename:body.profilename,sessionid:sessionid};
		res.send(JSON.stringify({success:true,profileid:10,sessionid:sessionid}));
	});
});

app.post('/api/checksessionid', (req, res) => {
	postExtractBody(req,(body)=>{
		if (body.addr in sessions && sessions[body.addr].sessionid==body.sessionid){
			res.send(JSON.stringify({success:true,profileid:10}));
		} else {
			res.send(JSON.stringify({success:false}));
		}
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
			// console.log(search_res)
			res.send(searchrivertablefn({searchresults:search_res}));
		});
	});
});

app.get('/favicon', (req, res) => {
	res.send('no favicon yet');
})

server.listen(port);