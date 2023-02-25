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

var fetchid = 0;
function raedaAPIReqObj(method, params = null){
	fetchid += 1;
	var resobj = {"jsonrpc": "2.0", "method": method, "id":fetchid };
	if (params!==null) resobj['params'] = params;
	return resobj;
}
function raedaAPICall(method, params = null){
	return fetch('http://localhost:3030/'+method, {
		method: 'post',
		body: JSON.stringify(raedaAPIReqObj(method,params)),
		headers: {'Content-Type': 'application/json'}
	}).then((res) => res.json()).then((body) => {
		return body;
	});
}

app.get('/', (req, res) => {
	raedaAPICall('message',{'from':'0x02','to':'0x01','msg':'Yoo heya fellow raeda user. this is an example message'}).then((rust_res)=>{
		console.log(rust_res)
		res.render('index',{rust_res:rust_res['result']});
	});
})
app.get('/favicon', (req, res) => {
	res.send('no favicon yet');
})

server.listen(port);