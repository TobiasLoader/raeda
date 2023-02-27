const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// const ethers = require('ethers');
// const provider = new ethers.InfuraProvider("maticmum",process.env.INFURA_API_KEY);
// const signer = new ethers.Wallet("WALLET_PRIVATE_KEY", provider);

// const p = process.env;

const watersourceABI = [
	'function bids(uint id) public view returns (Bid)',
];
const profileABI = [
	'function profiles(uint id) public view returns (Profile)',
];
const driptokenABI = [
];
const lakeABI = [
	'function initPost(uint postId, uint lakeId, address lakeAddress, address authAddress, uint maxPrice, string iX, string fX, uint exp) public returns (bool success)',
	'function setInitialTime(uint iT) public returns (bool success)',
];
const riverABI = [
	'function initPost(uint postId, uint riverId, address riverAddress, address authAddress, uint minPrice, string iX, string fX, uint exp) public returns (bool success)',
	// 'function bids(id) public view returns (Bid)',
];

// const watersourceContract = new ethers.Contract(p.WATERSOURCE_ADDR, watersourceABI, provider);
// const profileContract = new ethers.Contract(p.PROFILE_ADDR, profileABI, provider);
// const driptokenContract = new ethers.Contract(p.DRIPTOKEN_ADDR, driptokenABI, provider);
// const lakeContract = new ethers.Contract(p.LAKE_ADDR, lakeABI, provider);
// const riverContract = new ethers.Contract(p.RIVER_ADDR, riverABI, provider);

/////////////// LAKE -- SUPPLIER ///////////////////

// post as a lake (ie. supplier)
function lakePost({postId,lakeId,lakeAddress,authAddress,maxPrice,iX,fX,exp,iT=null,fT=null}){
	// initPost(postId,lakeId,lakeAddress,authAddress,maxPrice,iX,fX,exp)
	// if (iT!=null) setInitialTime(iT)
	// if (fT!=null) setFinalTime(fT)
	// returns bool success
	return true;
}

// bid as a lake (ie. supplier)
function lakeBid({postId,lakeAddress,bidPrice}){
	// bidPrice > minPrice (of riverPost)
	// returns bool success
	return true;
}

// get the bids as a lake (ie. supplier)
// -> for the <lakePost> with id <postId>: get all the <riverBid>'s.
function lakeGetBids(postId){
	return [{
		'postId':postId,
		'riverAddress':'0x01',
		'bidPrice':'0.12eth',
		'bidderId':'102'
	}];
}

/////////////// RIVER -- LOGISTICS ///////////////////

// post as a river (ie. logistics)
function riverPost({postId,riverId,riverAddress,authAddress,minPrice,iX,fX,exp,iT=null,fT=null}){
	// initPost(postId,riverId,riverAddress,authAddress,minPrice,iX,fX,exp)
	// if (iT!=null) setInitialTime(iT)
	// if (fT!=null) setFinalTime(fT)
	return 'post uploaded successfully';
}

// bid as a river (ie. logistics)
function riverBid({postId,riverAddress,bidPrice}){
	// bidPrice < maxPrice (of lakePost)
	return 'bid registered successfully';
}

// get the bids as a river (ie. logistics)
// -> for the <riverPost> with id <postId>: get all the <lakeBid>'s.
function riverGetBids(postId){
	return [{
		'postId':postId,
		'lakeAddress':'0x01',
		'bidPrice':'0.12eth',
	}];
}

/////////////// MESSENGER -- APPLIES TO BOTH LAKE & RIVER ///////////////////

let l = false;

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
	lakePost, lakeBid, lakeGetBids,
	riverPost, riverBid, riverGetBids,
	getMessages, postMessage, _rustCall
}