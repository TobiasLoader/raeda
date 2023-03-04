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
	$('body').addClass('notifactive');
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
	$('body').addClass('notifactive');
}


$('#notification #notifcross').click(function(){
	$('#notifwrapper').addClass('hide');
	$('body').removeClass('notifactive');
});

// cookies

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
	let c = ca[i];
	while (c.charAt(0) == ' ') {
	  c = c.substring(1);
	}
	if (c.indexOf(name) == 0) {
	  return c.substring(name.length, c.length);
	}
  }
  return "";
}

export function deleteCookie(cname) {
  if(getCookie(cname)!="") {
	document.cookie = cname + "=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}