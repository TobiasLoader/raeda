import * as raeda from "./raeda.js";
import * as utils from "./utils.js";
import * as wallet from "./wallet.js";

$(document).ready(function() {
	if (wallet.isConnected()){
		$('#lake-post').removeClass('done');
		$('#connect-prepost').addClass('done');
	}
});

$('#connect-prepost').click(function(){
	wallet.connectWallet().then((v)=>{
		if (wallet.isConnected()){
			$('#lake-post').removeClass('done');
			$('#connect-prepost').addClass('done');
		} else {
			utils.notification('Oops', ['Error connecting your wallet'], true);
		}
	});
});