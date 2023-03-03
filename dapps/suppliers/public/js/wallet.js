import * as utils from "./utils.js";
import * as raeda from "./raeda.js";

let web3;
let provider;
let accounts;
let contracts;

export let state = {
	signer:null,
	address:null,
	connected:null,
	login:null,
	profileid:null,
	sessionid:null
}


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
	state.address = window.ethereum.selectedAddress;
	state.connected = false;
	state.login = false;
	
	raeda.initContracts(provider).then((res)=>{
		initWalletConnection().then(()=>{
			afterConnectTry();
		});
	});
	
	ethereum.on('accountsChanged', async () => {
		state.address = window.ethereum.selectedAddress;
		if (state.address==null) accounts = null;
		state.connected = isConnected();
		amendConnectWalletButton();
	});
});


// $('body').click(()=>{
// 	raeda.rishinfnc();
// })

function isWalletInstalled() {
	return Boolean(window.ethereum);
}

export async function connectWallet() {
	accounts = await ethereum.request({method: 'eth_requestAccounts'});
	await provider.send("eth_requestAccounts", []);
	state.address = ethereum.selectedAddress;
	state.signer = provider.getSigner(state.address);
	state.connected = isConnected();
	raeda.connectSignerContracts(state.signer);
}

export function isConnected(){
	return accounts!=null && accounts.length > 0;
}

async function initWalletConnection() {
	if (state.address!=null && isWalletInstalled() && !isConnected()) await connectWallet();
	else {
		if (!isWalletInstalled()) console.log('Install MetaMask');
		state.connected = isConnected();
	}
}

function amendConnectWalletButton(){
	if (state.connected) {
		console.log("user connected");
		$('#create-profile').removeClass('done');
		$('#connect').addClass('done');
	}
	//  else {
	// 	console.log("user not connected");
	// 	$('#connect-wallet').removeClass('done');
	// 	$('#connect-wallet p').text('Connect Wallet');
	// }
}

function afterConnectTry(){
	autoLoginSessionId();
	amendConnectWalletButton();
}

function afterLoginSuccess(){
	$('.loginaction').addClass('hide');
	$('#signup').addClass('hide');
	$('#logout').removeClass('hide');
	$('#lake-post').removeClass('done');
}

function autoLoginSessionId(){
	state.sessionid = utils.getCookie('sessionid');
	if (state.connected && state.sessionid!=null){
		raeda.checkSessionId(state.address,state.sessionid).then((res)=>{
			if (res['success']){
				console.log(res)
				state.login = true;
				state.profileid = res['profileid'];
				afterLoginSuccess();
			}
		});
	}
}

export function requiresConnected(func,argsArray=[]){
	if (state.connected) func.apply(this,argsArray);
	else utils.notification('Not connected wallet!',['You need to connect your wallet to proceed.']);
}

export function requiresLogin(func,argsArray=[]){
	if (state.login){
		func.apply(this,argsArray);
	} else {
		if (state.connected) utils.notification('Not logged in!',['The following action is a mutation and you need to be authenticated to perform it. You have connected your wallet but not logged in.'],true);
		else utils.notification('Not connected your wallet or logged in!',['You need to connect your wallet and then login.'],true);
	}
}

$('.loginaction').click(function(){
	if (state.login) {
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
				raeda.lakeLogin(state.address,profilename,state.signer).then((res)=>{
					if (res['success']) {
						state.login = true;
						afterLoginSuccess();
						utils.setCookie('sessionid',res['sessionid'],1);
						$('.loginaction').addClass('hide');
						state.profileid = res['profileid'];
						utils.notification('Success', ['Login successful!','You signed in to the profile with id: '+state.profileid.toString()]);
					} else utils.notification('Oops', ['Login failed – please try another profile name or wallet address.'], true);
				});
			} else utils.notification('Oops', ['Login failed – no profile name provided'], true);
		});
	}
});

$('#logout').click(function(){
	utils.deleteCookie('sessionid');
	window.location.replace("/");
});