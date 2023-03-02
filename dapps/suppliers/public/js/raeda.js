import * as abi from "./abi.js";

let profileContract;
let lakeContract;
let riverContract;

let PROFILE_ADDR="0x175f097737B50406bEE7a86c0507Bc7d5a77f26F"
let LAKE_ADDR="0x71159b5cb83892A14ed42d7F47d310338596eEB9"
let RIVER_ADDR="0xf786c975ac9c635a5da7c68459802e5a6b19a9db"

let contractsInitiated = false;
let signerConnected = false;

/// INIT contracts & signer

export async function initContracts(provider){
	profileContract = new ethers.Contract(PROFILE_ADDR, abi.getABI('profile'),provider);
	lakeContract = new ethers.Contract(LAKE_ADDR, abi.getABI('lake'), provider);
	riverContract = new ethers.Contract(RIVER_ADDR, abi.getABI('river'), provider);
	contractsInitiated = true;
	return true;
}

export async function connectSignerContracts(signer){
	return _checkContractsInitiated(async ()=>{
		profileContract = profileContract.connect(signer);
		lakeContract = lakeContract.connect(signer);
		riverContract = riverContract.connect(signer);
		signerConnected = true;
		return true;
	});
}

// export function rishinfnc(){
// 	console.log(profileContract);
// 	profileContract.profiles(6).then((v)=>{
// 		console.log(v)
// 		console.log(v.description)
// 	});
// }

// RAEDA functions

export async function createProfile(profilename,description){
	return await _checkSignerConnectedAsync(async ()=>{
		try {
			console.log(profileContract)
			let response = await profileContract.createProfile(0,profilename,description);
			console.log('creat pr',response)
			console.log('create profile success');
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	});
}

export async function lakeLogin(addr,profilename,signer){
	return await _checkSignerConnectedAsync(async ()=>{
		let signature = await signer.signMessage(profilename);
		return await _raedaLakeAPICall('lakelogin',{addr:addr,profilename:profilename,signature:signature}).then((body)=>{
			return body;
		});
	});
}

export async function checkSessionId(addr,sessionid){
	return await _checkSignerConnectedAsync(async ()=>{
		return await _raedaLakeAPICall('checksessionid',{addr:addr,sessionid:sessionid}).then((body)=>{
			console.log('check sesh',body)
			return body;
		});
	});
}

// post as a lake (ie. suppliers)
// TODO -- add authAddress
export async function lakePost(addr,maxprice,postName,lakeId,iXx,iXy,fXx,fXy,exp,{postDesc=null,iT=null,fT=null}={}){
	return await _checkSignerConnectedAsync(async ()=>{
		try {
			lakeContract.initPost(postName,lakeId,iXx,iXy,fXx,fXy,exp,{from:addr,value:ethers.utils.parseUnits(maxprice.toString(),"wei")});
			// 'the graph' retrieves post info -- in particular postId
			// (SC emits event for post creation including postId)
			let postId = 0; // <-- replace
			if (iT!=null) lakeContract.addInitialTime(postId,iT);
			if (fT!=null) lakeContract.addFinalTime(postId,fT);
			// if (postDesc!=null) lakeContract.addDescription(postId,postDesc);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	});	
}

// post as a river (ie. logistics)
// TODO -- add authAddress
export async function riverPost(addr,minprice,{postName,riverId,iXx,iXy,fXx,fXy,exp,iT=null,fT=null}){
	return await _checkSignerConnectedAsync(async ()=>{
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
	});	
}

// bid as a lake (ie. supplier)
// function lakeBid(addr,bidprice,{postId,lakeId}){
// 	try {
// 		// bidPrice > minPrice (of riverPost)
// 		lakeContract.bid(postId,lakeId,{from:addr,value:eth.utils(bidprice,towei)});
// 		// returns bool success
// 		return true;
// 	} catch (error) {
// 		console.log(error);
// 		return false;
// 	}
// }

// bid as a river (ie. logistics)
// function riverBid(addr,bidprice,{postId,riverId}){
// 	try {
// 		// bidprice < maxprice (of lakePost)
// 		riverContract.bid(postId,riverId,{from:addr,value:eth.utils(bidprice,towei)});
// 		// returns bool success
// 		return true;
// 	} catch (error) {
// 		console.log(error);
// 		return false;
// 	}
// }

function _raedaLakeAPICall(method, params = null, local=true){
	let url = 'https://lake.raeda.app';
	if (local) url = 'http://127.0.0.1:3000'
	return fetch(url+'/api/'+method, {
		method: 'post',
		body: JSON.stringify(params),
		headers: {'Content-Type': 'application/json'}
	}).then((res) => res.json()).then((body) => {
		return body;
	});
}


function _checkContractsInitiated(fnc,argsArray=[]){
	if (contractsInitiated) {
		return fnc.apply(this,argsArray);
	} else {
		console.log('ERROR');
		console.log('Initiate the contracts first before connecting to a signer.')
		console.log('initContracts(provider)')
		return false;
	}
}
async function _checkSignerConnectedAsync(fnc,argsArray=[]){
	if (contractsInitiated) {
		if (signerConnected) {
			let res = await fnc.apply(this,argsArray);
			return res;
		} else {
			console.log('ERROR');
			console.log('Connect the signer to the contract.')
			console.log('connectSignerContracts(signer)')
			return false;
		}
	} else {
		console.log('ERROR');
		console.log('Initiate the contracts first before connecting to a signer.')
		console.log('initContracts(provider)')
		return false;
	}
}