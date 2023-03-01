import * as abi from "./abi.js";

let profileContract;
let lakeContract;
let riverContract;

let PROFILE_ADDR='0xE10FE8690E76fC5699eCa1b705cf6b218F3189ba';
let LAKE_ADDR='0x8af500dEf828b18A3a5D126F97aDf5D13eE69D3b';
let RIVER_ADDR='0x4F59e9d1459381e9D0c5fFE08C596DcA9D1d7541';

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
	return _checkContractsInitiated(()=>{
		profileContract = profileContract.connect(signer);
		lakeContract = lakeContract.connect(signer);
		riverContract = riverContract.connect(signer);
		signerConnected = true;
		return true;
	});
}

// RAEDA functions

export async function createProfile(profilename,description){
	return await _checkSignerConnectedAsync(async ()=>{
		try {
			profileContract.addProfile(0,profilename,description);
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
			return body;
		});
	});
}

// post as a lake (ie. suppliers)
// TODO -- add authAddress
export async function lakePost(addr,maxprice,{postName,lakeId,iXx,iXy,fXx,fXy,exp,iT=null,fT=null}){
	return await _checkSignerConnectedAsync(async ()=>{
		try {
			lakeContract.initPost(postName,lakeId,iXx,iXy,fXx,fXy,exp,{from:addr,value:ethers.utils.parseUnits(maxprice.toString(),"ether")});
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

function _raedaLakeAPICall(method, params = null, local=false){
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