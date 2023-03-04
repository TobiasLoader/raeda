import * as utils from "./utils.js";
import * as wallet from "./wallet.js";
import * as raeda from "./raeda.js";

$('#makebid').click(function(){
	$('#makebidarea').removeClass('hide');
});

$('#placebid').click(function(){
	let bidprice = $('#makebidprice').val();
	console.log(bidprice);
	wallet.requiresLogin(()=>{
		if (bidprice!=''){
			console.log('place bid');
			console.log(wallet.state.address,bidprice,postid,wallet.state.profileid);
			raeda.lakeBid(wallet.state.address,bidprice,postid,wallet.state.profileid).then((success)=>{
				if (success){
					utils.notification('Success!', ['Your bid was successful!','The creator of the post will be notified.']);
				} else {
					utils.notification('Error!', ['Your bid was unsuccessful!','Possible issues could be: you can\'t bid on a post of the same water type, the post is expired, you have not met the bidding requirements (less than the max bid).'], true);
				}
			});
		} else {
			utils.notification('Blank Bid', ['You cannot leave the bid field blank!','Please enter a value and try again.'], true);
		}
	});
});