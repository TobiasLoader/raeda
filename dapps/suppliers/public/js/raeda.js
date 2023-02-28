import * as abi from "./abi.js";

let profileContract;
let lakeContract;
let riverContract;

let PROFILE_ADDR='0xE10FE8690E76fC5699eCa1b705cf6b218F3189ba';
let LAKE_ADDR='0x8af500dEf828b18A3a5D126F97aDf5D13eE69D3b';
let RIVER_ADDR='0x4F59e9d1459381e9D0c5fFE08C596DcA9D1d7541';

let contractsInitiated = false;
let signerConnected = false;

export async function initContracts(provider){
	profileContract = new ethers.Contract(PROFILE_ADDR, abi.getABI('profile'), provider);
	lakeContract = new ethers.Contract(LAKE_ADDR, abi.getABI('lake'), provider);
	riverContract = new ethers.Contract(RIVER_ADDR, abi.getABI('river'), provider);
	contractsInitiated = true;
	return true;
	// return {profile:profileContract,lake:lakeContract,river:riverContract};
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

export async function lakePost(addr,maxprice,{postName,lakeId,iXx,iXy,fXx,fXy,exp,iT=null,fT=null}){
	_checkSignerConnected(()=>{
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
function _checkSignerConnected(fnc,argsArray=[]){
	if (contractsInitiated) {
		if (signerConnected) {
			return fnc.apply(this,argsArray);
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