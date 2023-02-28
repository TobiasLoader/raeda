export function notification(title,txt_array,error=false){
	$('#notification').removeClass();
	$('#notification #notiftitle').empty();
	$('#notification #notifdesc').empty();
	$('#notification #notifinputarea').removeClass();
	$('#notification #notifbtnrow').empty();
	if (error) $('#notification').addClass('error');
	$('#notification #notiftitle').text(title);
	for (var txt of txt_array){
		$('#notification #notifdesc').append('<p>'+txt+'</p>');
	}
	$('#notifwrapper').removeClass('hide');
}

export function buttonnotification(title,txt_array,btn_array){
	$('#notification').removeClass();
	$('#notification #notiftitle').empty();
	$('#notification #notifdesc').empty();
	$('#notification #notifinputarea').removeClass();
	$('#notification #notifbtnrow').empty();
	$('#notification #notiftitle').text(title);
	for (var txt of txt_array){
		$('#notification #notifdesc').append('<p>'+txt+'</p>');
	}
	$('#notifwrapper').removeClass('hide');
	for (var btn of btn_array){
		let button = $('<div class="notifbtn"><p>'+btn.name+'</p></div');
		for (var c of btn.classes){
			button.addClass(c);
		}
		$('#notification #notifbtnrow').append(button);
	}
}


$('#notification #notifcross').click(function(){
	$('#notifwrapper').addClass('hide');
});