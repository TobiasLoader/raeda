import * as abi from "./abi.js";

let profileContract;
let lakeContract;
let riverContract;

let PROFILE_ADDR="0x963Ee3D90D3f83a56940b1604b33e7C6f70d6cfF"
let LAKE_ADDR="0x5c67979d86B28A3EB607c00808F3dD05fd90f63a"
let RIVER_ADDR="0x0a6635b82e003337bbeA9325Dc3c624A2E835FdD"

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
			let txn = await lakeContract.initPost(postName,lakeId,iXx,iXy,fXx,fXy,exp,{from:addr,value:ethers.utils.parseUnits(maxprice.toString(),"wei")});
			let txnreceipt = await txn.wait();
			let postId = txnreceipt.events[1].args[0];
			if (iT!=null) await lakeContract.addInitialTime(postId,iT);
			if (fT!=null) await lakeContract.addFinalTime(postId,fT);
			if (postDesc!=null) await lakeContract.editDescription(postId,postDesc);
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