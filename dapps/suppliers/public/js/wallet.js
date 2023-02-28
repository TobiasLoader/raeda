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

let profileid;

$(document).ready(function() {
	const {ethereum} = window;
	const {Web3} = window;

	if (ethereum===undefined){
		utils.notification('Oops', ['The ethereum library didn\'t load correctly','Please refresh the page, this will most likely fix it.'],true)
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
	else utils.notification('Not connected wallet!',['You need to connect your wallet to proceed.']);
}

export function requiresLogin(func,argsArray=[]){
	if (login){
		func.apply(this,argsArray);
	} else {
		if (connected) utils.notification('Not logged in!',['The following action is a mutation and you need to be authenticated to perform it. You have connected your wallet but not logged in.'],true);
		else utils.notification('Not connected your wallet or logged in!',['You need to connect your wallet and then login.'],true);
	}
}

$('#login').click(function(){
	if (login) {
		utils.notification('Already logged in!',['You have already logged in!'],true);
	} else {
		utils.buttonnotification('Login',[],[{name:'Connect Wallet',classes:['connect']},{name:'Login',classes:['login','greyedout']}]);
		
		$('#notification #notifinputarea label').text('Enter your Profile Name:')
		$('#notification #notifinputarea input').attr("placeholder", "Profile Name");
		$('#notification #notifinputarea').addClass('active');

		$('#notification .notifbtn.connect').click(function(){
			if (isConnected()){
				$('.notifbtn.login').removeClass('greyedout');
				$('.notifbtn.connect').addClass('greyedout');
			} else {
				connectWallet().then((v)=>{
					afterConnectTry();
					if (isConnected()){
						$('.notifbtn.login').removeClass('greyedout');
						$('.notifbtn.connect').addClass('greyedout');
					} else {
						notification('Oops', ['Error connecting your wallet'], true);
					}
				});
			}
		});
		
		$('.notifbtn.login').click(function(){
			let profilename = $('#notification input').val();
			if (profilename.length>0){
				raeda.lakeLogin(address,profilename,signer).then((res)=>{
					if (res['success']) {
						$('#login').addClass('hide');
						profileid = res['profileid'];
						utils.notification('Success', ['Login successful!','You signed in to the profile with id: '+profileid.toString()]);
					} else utils.notification('Oops', ['Login failed – please try another profile name or wallet address.'], true);
				});
			} else utils.notification('Oops', ['Login failed – no profile name provided'], true);
		});
	}
});

