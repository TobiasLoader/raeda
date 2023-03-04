import * as raeda from "./raeda.js";
import * as utils from "./utils.js";
import * as wallet from "./wallet.js";

$(document).ready(function() {
	if (wallet.isConnected()){
		$('#river-post').removeClass('done');
		$('#connect-prepost').addClass('done');
	}
});

$('#connect-prepost').click(function(){
	wallet.connectWallet().then((v)=>{
		if (wallet.isConnected()){
			$('#river-post').removeClass('done');
			$('#connect-prepost').addClass('done');
		} else {
			utils.notification('Oops', ['Error connecting your wallet'], true);
		}
	});
});

$('#river-post').click(function(){
	let pname = $('#postname').val();
	let pdesc = $('#postdesc').val();
	let pmaxprice = $('#postmaxprice').val();
	let pexp = Math.round(new Date($('#postexp-date').val()+'T'+$('#postexp-time').val()).valueOf()/1000);
	// console.log('pexp here',pexp);
	// console.log(pexp);
	let pix = $('#poststartloclat').val();
	let piy = $('#poststartloclng').val();
	let pfx = $('#postendloclat').val();
	let pfy = $('#postendloclng').val();
	if (pname==''){
		utils.notification('Oops', ['You cannot leave the post name field empty'], true);
	} else if (pmaxprice==''){
		utils.notification('Oops', ['You cannot leave the max price field empty'], true);
	} else if (parseFloat(pexp)==NaN){
		utils.notification('Oops', ['Expiry time must be a number'], true);
	} else if (parseFloat(pmaxprice)==NaN){
		utils.notification('Oops', ['Max price must be a number'], true);
	} else if (parseFloat(pix)==NaN || parseFloat(piy)==NaN){
		utils.notification('Oops', ['The start location coordinates must be numbers.'], true);
	} else if (parseFloat(pfx)==NaN || parseFloat(pfy)==NaN){
		utils.notification('Oops', ['The end location coordinates must be numbers.'], true);
	} else {
		// standard used by raeda: 1/10,000 of lat/lng coordinate
		let locmult = 1000; // to be 10000 once rishin has got his act together
		
		let pid = wallet.state.profileid;
		pmaxprice = parseFloat(pmaxprice);
		pix = BigInt(parseInt(parseFloat(pix)*locmult));
		piy = BigInt(parseInt(parseFloat(piy)*locmult));
		pfx = BigInt(parseInt(parseFloat(pfx)*locmult));
		pfy = BigInt(parseInt(parseFloat(pfy)*locmult));
		pexp = BigInt(pexp);
		if (pexp<1677783696){
			utils.notification('Oops', ['The expiry data is in the past.'], true);
		} else {
			utils.notification('Sign wallet then wait :)', ['Complete wallet signature then wait for post to be added to the blockchain – it should be done shortly.']);
			raeda.riverPost(wallet.state.address,pmaxprice,pname,pid,pix,piy,pfx,pfy,pexp,{postDesc:pdesc}).then((v)=>{
				if (v){
					utils.buttonnotification('Yess', ['Post was uploaded successfully.'],[{'name':'done','classes':['newpostdone']}]);
					$('.notifbtn.newpostdone').click(function(){
						window.location.href='/';
					});
				} else {
					utils.notification('Oops', ['Something went wrong, could not create a new post.'], true);
				}
			});
		}
	}
});