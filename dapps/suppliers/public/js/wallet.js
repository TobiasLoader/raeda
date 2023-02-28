import * as utils from "./utils.js";
import * as raeda from "./raeda.js";

let web3;
let provider;
let signer;
let accounts;
let address;
let connected;
let login;

let contracts;

$(document).ready(function() {
	const {ethereum} = window;
	const {Web3} = window;

	if (ethereum===undefined){
		utils.notification('Oops', ['The ethereum library didn\'t load correctly','Please refresh the page, this will most likely fix it.','If this occurs repeatedly please make an issue on the LensPy Github repo.'])
	}
	
	// init local wallet state
	// web3 = new Web3(ethereum);
	provider = new ethers.providers.Web3Provider(window.ethereum);
	// console.log(provider)
	accounts = null;
	
	// init local session state
	address = window.ethereum.selectedAddress;
	connected = false;
	login = false;
	
	raeda.initContracts(provider).then((res)=>{
		console.log(res);
		initWalletConnection().then(()=>{
			afterConnectTry();
		});
	});
	
	ethereum.on('accountsChanged', async () => {
		address = window.ethereum.selectedAddress;
		if (address==null) accounts = null;
		connected = isConnected();
		amendConnectWalletButton();
	});
});

function isWalletInstalled() {
	return Boolean(window.ethereum);
}

async function connectWallet() {
	accounts = await ethereum.request({method: 'eth_requestAccounts'});
	await provider.send("eth_requestAccounts", []);
	address = ethereum.selectedAddress;
	signer = provider.getSigner(address);
	connected = isConnected();
	raeda.connectSignerContracts(signer);
	// console.log(address)
	raeda.lakePost(address,0.01,{postName:'cool post',lakeId:0,iXx:0,iXy:0,fXx:0,fXy:0,exp:0});
	console.log(address);
}

function isConnected(){
	return accounts!=null && accounts.length > 0;
}

async function initWalletConnection() {
	if (address!=null && isWalletInstalled() && !isConnected()) await connectWallet();
	else {
		if (!isWalletInstalled()) console.log('Install MetaMask');
		connected = isConnected();
	}
}

function amendConnectWalletButton(){
	if (connected) {
		console.log("user connected");
		$('#login').addClass('hide');
		$('#connected').removeClass('hide');
	}
	//  else {
	// 	console.log("user not connected");
	// 	$('#connect-wallet').removeClass('done');
	// 	$('#connect-wallet p').text('Connect Wallet');
	// }
}

function afterConnectTry(){
	amendConnectWalletButton();
}

export function requiresConnected(func,argsArray=[]){
	if (connected) func.apply(this,argsArray);
	else notification('Not connected wallet!',['You need to connect your wallet to proceed.']);
}

export function requiresLogin(func,argsArray=[]){
	if (login){
		func.apply(this,argsArray);
	} else {
		if (connected) notification('Not logged in!',['The following action is a mutation and you need to be authenticated to perform it. You have connected your wallet but not logged in.']);
		else notification('Not connected your wallet or logged in!',['You need to connect your wallet and then login.']);
	}
}

$('#login').click(function(){
	if (connected) {
		notification('Already connected!',['You have already connected your wallet!']);
	}
	else {
		connectWallet().then((v)=>{
			afterConnectTry();
		});
	}
});