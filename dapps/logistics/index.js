const fs = require('fs');
// let sessions = JSON.parse(fs.readFileSync('./sessions.json', 'utf8'));
let sessions = {}

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const pug = require('pug');
app.use(express.static('public'));

app.set('views', './views')
app.set('view engine', 'pug');

// raeda package
const raeda = require('./../../core/raeda-node');
const port = 3001;
// const port = process.env.PORT || 3000;

const searchrivertablefn = pug.compileFile('views/searchrivertable.pug');
const myopenbidsfn = pug.compileFile('views/myopenbids.pug');
const myopenpostsfn = pug.compileFile('views/myopenposts.pug');

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
	res.render('index');
});

app.get('/profile', (req, res) => {
	res.render('profile');
});

app.get('/newpost', (req, res) => {
	let d = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
	let cd = d.toISOString().split('T')[0];
	let ct = d.getHours().toLocaleString(undefined, {minimumIntegerDigits: 2}).toString()+':'+d.getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2}).toString();
	res.render('newpost',{currenttime:ct,currentdate:cd});
});

app.get('/signup', (req, res) => {
	res.render('signup');
});

app.get('/advancedsearch', (req, res) => {
	res.render('advancedsearch');
});

app.post('/api/riverlogin', (req, res) => {
	postExtractBody(req,(body)=>{
		console.log(body);
		raeda.riverGetId(body.addr,body.profilename).then((riveridobj)=>{
			console.log('riveridobj',riveridobj)
			if (riveridobj['found']){
				let sessionid = 100000 + Math.floor(Math.random()*900000);
				sessions[body.addr] = {profilename:body.profilename,sessionid:sessionid,profileid:riveridobj.id};
				res.send(JSON.stringify({found:true,profileid:riveridobj.id,profilename:body.profilename,sessionid:sessionid}));
			} else {
				res.send(JSON.stringify({found:false}));
			}
		});
	});
});

app.post('/api/checksessionid', (req, res) => {
	postExtractBody(req,(body)=>{
		if (body.addr in sessions && sessions[body.addr].sessionid==body.sessionid){
			res.send(JSON.stringify({success:true,profileid:sessions[body.addr].profileid,profilename:sessions[body.addr].profilename}));
		} else {
			res.send(JSON.stringify({success:false}));
		}
	});
});

app.post('/api/accept_bid', (req, res) => {
	res.send('eg. accepted bid success');
});

app.get('/post-:postid', (req, res) => {
	const { headers, method, url, params } = req;
	const postid = params['postid'];
	raeda.getPost(postid).then((postinfo)=>{
		if (postinfo['found']) {
			let bidlist = [];
			for (var b=0; b<postinfo['bids'].length; b+=1){
				bidlist.push(postinfo['bids'][b]['id']);
			}
			console.log(bidlist);
			console.log('postinfo',postinfo);
			res.render('viewpost',{found:true,post:postinfo,bidlist:bidlist});
		}
		else res.render('viewpost',{found:false,post:{id:-1},bidlist:[]});
	})
});

// app.get('/messenger', (req, res) => {
// 	raeda.getMessages('0x02','0x01').then((rust_res)=>{
// 		let txt = 'From: ' + rust_res['from'] + ' – To: ' + rust_res['to'] + ' – Msg: ' + rust_res['msg'];
// 		res.render('messenger',{res:txt});
// 	});
// });
// 
// 
// app.get('/messenger-:name', (req, res) => {
// 	const { headers, method, url, params } = req;
// 	raeda.getMessages('0x02','0x01').then((rust_res)=>{
// 		let txt = 'From: ' + rust_res['from'] + ' – To: ' + rust_res['to'] + ' – Msg: ' + rust_res['msg'];
// 		res.render('message',{name:params['name']});
// 	});
// });

app.post('/api/post_message', (req, res) => {
	// raeda.postMessage('0x02','0x01','really cool msg').then((rust_res)=>{
	// 	let txt = 'From: ' + rust_res['from'] + ' – To: ' + rust_res['to'] + ' – Msg: ' + rust_res['msg'];
	// 	res.send(txt);
	// });
});

app.post('/api/my-open-bids', (req, res) => {
	postExtractBody(req,(body)=>{
		raeda.riverMyOpenBids(body['profilename']).then((openbids)=>{
			res.send(myopenbidsfn({openbids:openbids}));
		});	
	});
});

app.post('/api/my-open-posts', (req, res) => {
	postExtractBody(req,(body)=>{
		raeda.riverMyOpenPosts(body['profilename']).then((openposts)=>{
			res.send(myopenpostsfn({openposts:openposts}));
		});	
	});
});

app.post('/api/river-simple-search', (req, res) => {
	postExtractBody(req,(body)=>{
		raeda.riverSimpleSearch(body['lat'],body['lng'],body['radius'],body['minprice'],body['maxprice']).then((search_res)=>{
			console.log('SEARCH',search_res)
			res.send(searchrivertablefn({searchresults:search_res}));
		});
	});
});

app.get('/profile-:name', (req, res) => {
	const { headers, method, url, params } = req;
	raeda.getProfile(params['name']).then((profileobj)=>{
		console.log('profileobj',profileobj)
		if (profileobj['found']) {
			res.render('profile',{found:true,name:profileobj['profileName'],desc:profileobj['description'],waterType:profileobj['waterType'],id:profileobj['id'],posts:profileobj['posts']});
		} else {
			console.log('not found')
			res.render('profile',{found:false});
		}
	});
});


app.post('/api/get-winning-bid', (req, res) => {
	postExtractBody(req,(body)=>{
		console.log(body);
		raeda.getWinningBid(body.postid).then((bidderobj)=>{
			console.log('bidderobj',bidderobj)
			if (bidderobj['found']){
				res.end(bidderobj['profileName']);
			} else {
				res.end('');
			}
		});
	});
});


app.get('/favicon', (req, res) => {
	res.send('no favicon yet');
})

server.listen(port);