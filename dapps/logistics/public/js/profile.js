import * as wallet from "./wallet.js";
import * as raeda from "./raeda.js";
import * as utils from "./utils.js";

$('#adddriver').click(function(){
	let driverdid = $('#driver-pub-addr').val();
	if (driverdid!=''){
		raeda.addDriver(wallet.state.profilename, driverdid).then((v)=>{
			if (v){
				utils.notification('Driver Added', ['Success! Driver with did added.']);
			} else {
				utils.notification('Yikes', ['Unable to add driver.']);
			}
		});
	} else {
		utils.notification('Driver did field empty', ['Oops! You cannot leave the driver did field empty.'],true);
	}
});