import * as raeda from "./raeda.js";
import * as utils from "./utils.js";
import * as wallet from "./wallet.js";

function afterLoginSuccess(){
	$('.loginaction').addClass('hide');
	$('#signup').addClass('hide');
	$('#profile').removeClass('hide');
	$('#logout').removeClass('hide');
}

$('#connect').click(function(){
	if (wallet.isConnected()){
		$('#create-profile').removeClass('done');
		$('#connect').addClass('done');
	} else {
		wallet.connectWallet().then((v)=>{
			if (wallet.isConnected()){
				$('#create-profile').removeClass('done');
				$('#connect').addClass('done');
			} else {
				utils.notification('Oops', ['Error connecting your wallet'], true);
			}
		});
	}
});

$('#create-profile').click(()=>{
	let pname = $('#profilename').val();
	let pdesc = $('#profiledesc').val();
	if (pname==''){
		utils.notification('Oops', ['You cannot leave the profile name field empty'], true);
	} else if (pdesc==''){
		utils.notification('Oops', ['You cannot leave the description field empty'], true);
	} else {
		raeda.createProfileRiver(pname,pdesc).then((v)=>{
			if (v){
				utils.notification('Success', ['Successfully create a new profile.','Please now log in to '+pname]);
				// afterLoginSuccess();
				// raeda.riverLogin(wallet.state.address,pname,wallet.state.signer).then((res)=>{
				// 	console.log(res);
				// 	if (res['found']) {
				// 		wallet.state.login = true;
				// 		afterLoginSuccess();
				// 		utils.setCookie('sessionid',res['sessionid'],1);
				// 		$('.loginaction').addClass('hide');
				// 		wallet.state.profileid = res['profileid'];
				// 		window.location.href = "/";
				// 	} else utils.notification('Oops', ['Login failed – please try another profile name or wallet address.'], true);
				// });
			} else {
				utils.notification('Oops', ['Something went wrong, the new profile could not be updated.'], true);
			}
		});
	}
});