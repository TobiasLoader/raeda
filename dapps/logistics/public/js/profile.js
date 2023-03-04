$('#adddriver').click(function(){
	let driverdid = $('#makebidprice').val();
	if (driverdid!=''){
		wallet.requiresLogin(()=>
			console.log('add river');
			fetch('/api/river-add-driver', {
				method: 'post',
				body:JSON.stringify({
					'rivername':profilename,
					'driverdid':driverdid
				}),
				headers: {'Content-Type': 'application/json'}
			}).then((res) => {
				console.log(res);
				notification('Driver Added', ['Success! Driver with did added.']);
				return true;
			});
		});
	} else {
		notification('Driver did field empty', ['Oops! You cannot leave the driver did field empty.'],true);
	}
});