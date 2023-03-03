import * as utils from "./utils.js";
import * as wallet from "./wallet.js";

$('#makebid').click(function(){
	$('#makebidarea').removeClass('hide');
});

$('#placebid').click(function(){
	let bidprice= $('#makebidprice').val();
	console.log(bidprice);
	wallet.requiresLogin(()=>{
		console.log(1)
		if (bidprice!=''){
			console.log('place bid');
		} else {
			utils.notification('Blank Bid', ['You cannot leave the bid field blank!','Please enter a value and try again.'], true);
		}
	});
});