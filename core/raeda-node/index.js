const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// test pub/pri keys used also in LensPy
// pub = "0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01"
// pri = "0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709"

// var fs = require('fs');
// const ethers = require('ethers');
// const provider = new ethers.InfuraProvider("maticmum",process.env.INFURA_API_KEY);
// const signer = new ethers.Wallet(pri, provider);

// const watersourceABI = [
// 	'function bids(uint id) public view returns (Bid)',
// ];

// function getABI(filename){
	// return JSON.parse(fs.readFileSync('../../core/subgraph/ABIs/'+filename+'.json', 'utf8'))['abi'];
// }

// const profileABI = getABI('profile');
// const lakeABI = getABI('lake');
// const riverABI = getABI('river');

// const watersourceContract = new ethers.Contract(p.WATERSOURCE_ADDR, watersourceABI, provider);
// const profileContract = new ethers.Contract(process.env.PROFILE_ADDR, profileABI, provider);
// const streamTokenContract = new ethers.Contract(p.streamToken_ADDR, streamTokenABI, provider);
// const lakeContract = new ethers.Contract(process.env.LAKE_ADDR, lakeABI, provider);
// const riverContract = new ethers.Contract(process.env.RIVER_ADDR, riverABI, provider);

/////////////// LAKE -- SUPPLIER ///////////////////

// post as a lake (ie. supplier)
// authAddress -- to be added
function lakePost(addr,maxprice,{postName,lakeId,iXx,iXy,fXx,fXy,exp,iT=null,fT=null}){
	try {
		lakeContract.initPost(postName,lakeId,iXx,iXy,fXx,fXy,exp,{from:addr,value:eth.utils(maxprice,towei)});
		// 'the graph' retrieves post info -- in particular postId
		// (SC emits event for post creation including postId)
		let postId = 0; // <-- replace
		if (iT!=null) lakeContract.addInitialTime(postId,iT);
		if (fT!=null) lakeContract.addFinalTime(postId,fT);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

// bid as a lake (ie. supplier)
function lakeBid(addr,bidprice,{postId,lakeId}){
	try {
		// bidPrice > minPrice (of riverPost)
		lakeContract.bid(postId,lakeId,{from:addr,value:eth.utils(bidprice,towei)});
		// returns bool success
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

// get the bids as a lake (ie. supplier)
// -> for the <lakePost> with id <postId>: get all the <riverBid>'s.
function lakeGetBids(postId){
	// get from `the graph`
	// PARAMS: postId
	return [{
		'postId':postId,
		'riverAddress':'0x01',
		'bidPrice':'0.12eth',
		'bidderId':'102'
	}];
}

// get the users (a lake) open bids
function lakeMyOpenBids(addr){
	// get from `the graph`
	// PARAMS: addr
	return [
		{
			'bidprice':'0.12',
			'info':'post1 on Rishin'
		},
		{
			'bidprice':'0.10',
			'info':'post2 on Hamzah'
		},
		{
			'bidprice':'0.09',
			'info':'post3 on Mary'
		}
	];
}

// get the users (a lake) open posts
function lakeMyOpenPosts(addr){
	// get from `the graph`
	// PARAMS: addr
	return [
		{
			'postname':'POTATOES',
			'maxprice':'0.16',
			'bestprice':'0.11',
		},
		{
			'postname':'CARROTS',
			'maxprice':'0.10',
			'bestprice':'',
		},
		{
			'postname':'PAPER',
			'maxprice':'0.12',
			'bestprice':'0.08',
		},
		{
			'postname':'CHIPS',
			'maxprice':'0.06',
			'bestprice':'',
		}
	];
}

// search for river posts (as a lake) wrt simple criteria
async function lakeSimpleSearch(lat,lng,radius,minprice,maxprice){
	// get from `the graph`
	// PARAMS: lat,lng,radius,minprice,maxprice
	return [
		{
			'postname':'CHAIR',
			'river':'Hamzah',
			'rivermin':'0.08',
			'bestprice':'0.10'
		},
		{
			'postname':'TABLE',
			'river':'Mary',
			'rivermin':'0.14',
			'bestprice':''
		},
		{
			'postname':'CLOTH',
			'river':'Rishin',
			'rivermin':'0.16',
			'bestprice':''
		},
		{
			'postname':'CLOAK',
			'river':'Toby',
			'rivermin':'0.13',
			'bestprice':'0.13'
		},
		{
			'postname':'COAT',
			'river':'Juuso',
			'rivermin':'0.10',
			'bestprice':'0.14'
		}
	];
}

/////////////// RIVER -- LOGISTICS ///////////////////

// post as a river (ie. logistics)
// TODO -- add authAddress
function riverPost(addr,minprice,{postName,riverId,iXx,iXy,fXx,fXy,exp,iT=null,fT=null}){
	try {
		riverContract.initPost(postName,riverId,iXx,iXy,fXx,fXy,exp,{from:addr,value:eth.utils(minprice,towei)});
		// 'the graph' retrieves post info -- in particular postId
		// (SC emits event for post creation including postId)
		let postId = 0; // <-- replace
		if (iT!=null) riverContract.addInitialTime(postId,iT);
		if (fT!=null) riverContract.addFinalTime(postId,fT);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
	
}

// bid as a river (ie. logistics)
function riverBid(addr,bidprice,{postId,riverId}){
	try {
		// bidprice < maxprice (of lakePost)
		riverContract.bid(postId,riverId,{from:addr,value:eth.utils(bidprice,towei)});
		// returns bool success
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

// get the bids as a river (ie. logistics)
// -> for the <riverPost> with id <postId>: get all the <lakeBid>'s.
function riverGetBids(postId){
	// get from `the graph`
	// PARAMS: postId
	return [{
		'postId':postId,
		'lakeAddress':'0x01',
		'bidPrice':'0.12eth',
	}];
}

/////////////// MESSENGER -- APPLIES TO BOTH LAKE & RIVER ///////////////////

let l = true;

function _rustCall(method, params = null, local=false){
	let url = 'https://rust.raeda.app';
	if (local) url = 'http://0.0.0.0:8000'
	return fetch(url+'/api/'+method, {
		method: 'post',
		body: JSON.stringify(params),
		headers: {'Content-Type': 'application/json'}
	}).then((res) => res.json()).then((body) => {
		return body;
	});
}

function getMessages(from,to){
	return _rustCall('messages',{'from':from,'to':to},l);
}

function postMessage(from,to,msg){
	return _rustCall('messages',{'from':from,'to':to,'msg':msg},l);
}

module.exports = {
	lakePost,
	lakeBid,
	lakeGetBids,
	lakeMyOpenBids,
	lakeMyOpenPosts,
	lakeSimpleSearch,
	riverPost,
	riverBid,
	riverGetBids,
	getMessages,
	postMessage,
	_rustCall
}