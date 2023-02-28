export function notification(title,txt_array){
	$('#notification #notiftitle').empty();
	$('#notification #notifdesc').empty();
	$('#notification #notiftitle').text(title);
	for (var txt of txt_array){
		$('#notification #notifdesc').append('<p>'+txt+'</p>');
	}
	$('#notifwrapper').removeClass('hide');
}

$('#notification #notifcross').click(function(){
	$('#notifwrapper').addClass('hide');
});