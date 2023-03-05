import * as abi from "./abi.js";

let profileContract;
let lakeContract;
let riverContract;

let PROFILE_ADDR="0xacBdBd10791262589B5de030a5990845D714A731"
let LAKE_ADDR="0x21a991cf6c59cdD505bF9Dd6ADB120d2FDFA46BE"
let RIVER_ADDR="0xdFf17343E71eDAb3460c541F52c19C97c8e6EbBe"

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

export async function createProfileLake(profilename,description){
	return await _checkSignerConnectedAsync(async ()=>{
		try {
			let response = await profileContract.createProfile(0,profilename,description);
			console.log('create profile success',response);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	});
}

export async function createProfileRiver(profilename,description){
	return await _checkSignerConnectedAsync(async ()=>{
		try {
			let response = await profileContract.createProfile(1,profilename,description);
			// console.log(response)
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

export async function riverLogin(addr,profilename,signer){
	return await _checkSignerConnectedAsync(async ()=>{
		let signature = await signer.signMessage(profilename);
		return await _raedaRiverAPICall('riverlogin',{addr:addr,profilename:profilename,signature:signature}).then((body)=>{
			return body;
		});
	});
}

export async function lakeCheckSessionId(addr,sessionid){
	return await _checkSignerConnectedAsync(async ()=>{
		return await _raedaLakeAPICall('checksessionid',{addr:addr,sessionid:sessionid}).then((body)=>{
			return body;
		});
	});
}

export async function riverCheckSessionId(addr,sessionid){
	return await _checkSignerConnectedAsync(async ()=>{
		return await _raedaRiverAPICall('checksessionid',{addr:addr,sessionid:sessionid}).then((body)=>{
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
			// console.log(txnreceipt,txnreceipt.events[1].args[0])
			// let postId = txnreceipt.events[1].args[0];
			let postId = parseInt(txnreceipt.events[1].topics[1],16);
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
export async function riverPost(addr,minprice,postName,riverId,iXx,iXy,fXx,fXy,exp,{postDesc=null,iT=null,fT=null}={}){
	return await _checkSignerConnectedAsync(async ()=>{
		try {
			// console.log('START')
			// console.log(postName,riverId,iXx,iXy,fXx,fXy,exp,{from:addr,value:ethers.utils.parseUnits(minprice.toString(),"wei")})
			let txn = await riverContract.initPost(postName,riverId,iXx,iXy,fXx,fXy,exp,{from:addr,value:ethers.utils.parseUnits(minprice.toString(),"wei")});
			// console.log('TXN')
			// console.log(txn)
			let txnreceipt = await txn.wait();
			// console.log('RECEIPT')
			// console.log(txnreceipt)
			// let postId = txnreceipt.events[1].topics[1];
			let postId = parseInt(txnreceipt.events[1].topics[1],16);
			// console.log('POSTID')
			// console.log(postId)
			if (iT!=null) await riverContract.addInitialTime(postId,iT);
			if (fT!=null) await riverContract.addFinalTime(postId,fT);
			if (postDesc!=null) await riverContract.editDescription(postId,postDesc);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	});	
}

// bid as a lake (ie. supplier)
export async function lakeBid(addr,bidprice,postId,bidderId){
	return await _checkSignerConnectedAsync(async ()=>{
		try {
			let txn = await riverContract.bid(postId,bidderId,{from:addr,value:ethers.utils.parseUnits(bidprice.toString(),"wei")});
			// console.log('make bid success',txn);
			// let txnreceipt = await txn.wait();
			// let postId = txnreceipt.events[1].args[0];
			// if (iT!=null) await lakeContract.addInitialTime(postId,iT);
			// if (fT!=null) await lakeContract.addFinalTime(postId,fT);
			// if (postDesc!=null) await lakeContract.editDescription(postId,postDesc);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	});	
}


// bid as a lake (ie. supplier)
export async function riverBid(addr,bidprice,postId,bidderId){
	return await _checkSignerConnectedAsync(async ()=>{
		try {
			let txn = await lakeContract.bid(postId,bidderId,{from:addr,value:ethers.utils.parseUnits(bidprice.toString(),"wei")});
			// let debug = await lakeContract.bids(postId,2)
			console.log('make bid success',txn);
			// let txnreceipt = await txn.wait();
			// let postId = txnreceipt.events[1].args[0];
			// if (iT!=null) await lakeContract.addInitialTime(postId,iT);
			// if (fT!=null) await lakeContract.addFinalTime(postId,fT);
			// if (postDesc!=null) await lakeContract.editDescription(postId,postDesc);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	});	
}

function _raedaLakeAPICall(method, params = null, local=true){
	let url = 'https://lake.raeda.app';
	if (local) url = 'http://127.0.0.1:3001'
	return fetch(url+'/api/'+method, {
		method: 'post',
		body: JSON.stringify(params),
		headers: {'Content-Type': 'application/json'}
	}).then((res) => res.json()).then((body) => {
		return body;
	});
}

function _raedaRiverAPICall(method, params = null, local=true){
	let url = 'https://river.raeda.app';
	if (local) url = 'http://127.0.0.1:3001'
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


export function lakeMyOpenBids(profileName){
	console.log(profileName)
	fetch('/api/my-open-bids', {
		method: 'post',
		body:JSON.stringify({
			'profilename':profileName,
		}),
		headers: {'Content-Type': 'application/json'}
	}).then((response) => {
		return response.text();
	}).then((html) => {
		$('#bid-list').html(html);
	});
}

export function lakeMyOpenPosts(profileName){
	fetch('/api/my-open-posts', {
		method: 'post',
		body:JSON.stringify({
			'profilename':profileName,
		}),
		headers: {'Content-Type': 'application/json'}
	}).then((response) => {
		return response.text();
	}).then((html) => {
		$('#post-list').html(html);
	});
}

export function riverMyOpenBids(profileName){
	fetch('/api/my-open-bids', {
		method: 'post',
		body:JSON.stringify({
			'profilename':profileName,
		}),
		headers: {'Content-Type': 'application/json'}
	}).then((response) => {
		return response.text();
	}).then((html) => {
		$('#bid-list').html(html);
	});
}

export function riverMyOpenPosts(profileName){
	fetch('/api/my-open-posts', {
		method: 'post',
		body:JSON.stringify({
			'profilename':profileName,
		}),
		headers: {'Content-Type': 'application/json'}
	}).then((response) => {
		return response.text();
	}).then((html) => {
		$('#post-list').html(html);
	});
}

export async function lakeChooseBid(postid,bidid){
	return await _checkSignerConnectedAsync(async ()=>{
		try {
			let response = await lakeContract.acceptBid(postid,bidid);
			console.log('accept bid success',response);
			return response;
		} catch (error) {
			console.log(error);
			return false;
		}
	});
}

export async function riverChooseBid(postid,bidid){
	return await _checkSignerConnectedAsync(async ()=>{
		try {
			let response = await riverContract.acceptBid(postid,bidid);
			console.log('accept bid success',response);
			return response;
		} catch (error) {
			console.log(error);
			return false;
		}
	});
}

export async function lakeCloseDeal(postid,profileId){
	return await _checkSignerConnectedAsync(async ()=>{
		try {
			let response = await lakeContract.closeDeal(postid,profileId);
			return response;
		} catch (error) {
			console.log(error);
			return false;
		}
	});
}

export async function riverCloseDeal(postid,profileId){
	return await _checkSignerConnectedAsync(async ()=>{
		try {
			let response = await riverContract.closeDeal(postid,profileId);
			return response;
		} catch (error) {
			console.log(error);
			return false;
		}
	});
}