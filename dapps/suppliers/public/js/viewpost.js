import * as utils from "./utils.js";
import * as wallet from "./wallet.js";
import * as raeda from "./raeda.js";

$(document).ready(function() {
	loadMap(bigstartlat, bigstartlng, bigendlat, bigendlng);
});

$('#makebid').click(function(){
	$('#makebidarea').removeClass('hide');
});

$('#placebid').click(function(){
	let bidprice = $('#makebidprice').val();
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

$('#choosebid').click(function(){
	utils.buttonnotification('Choose Bid',[],[{name:'Choose',classes:['choose','']}]);
	
	$('#notification #notifinputarea label').text('Enter your chosen bid ID:')
	$('#notification #notifinputarea input').attr("placeholder", "eg. 3");
	$('#notification #notifinputarea').addClass('active');
	
	$('.notifbtn.choose').click(function(){
		let bidchoice = $('#notifinput').val();
		if (bidchoice==''){
			utils.notification('Error!', ['You cannot leave the bid ID field blank.'], true);
		} else if (isNaN(bidchoice)){
			utils.notification('Error!', ['You have not entered a number fo the bid ID.'], true);
		} else if (!bidlist.includes(parseInt(bidchoice))){
			utils.notification('Error!', ['There is no bid with that ID on this post.'], true);
		} else {
			raeda.lakeChooseBid(postid,parseInt(bidchoice)).then((res)=>{
				console.log(res);
				utils.notification('Success!', ['You have indicated that you would like to accept the bid with id '+bidchoice]);
			});
		}
	});
});

function injectScript(src) {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = src;
		script.addEventListener('load', resolve);
		script.addEventListener('error', e => reject(e.error));
		document.head.appendChild(script);
	});
}

function initMap(startlat, startlng, endlat, endlng) {
	return ()=>{
		const map = new google.maps.Map(document.getElementById("loc-map"), {
			zoom: 9,
			center: { lat: (startlat+endlat)/2, lng: (startlng+endlng)/2 },
			mapTypeId: "terrain",
			disableDefaultUI: true,
			styles: [
		  		{ elementType: "geometry", stylers: [{ color: "#242f3e" }] },
		  		{ elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
		  		{ elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
		  		{
					featureType: "administrative.locality",
					elementType: "labels.text.fill",
					stylers: [{ color: "#d59563" }],
		  		},
		  		{
					featureType: "poi",
					elementType: "labels.text.fill",
					stylers: [{ color: "#d59563" }],
		  		},
		  		{
					featureType: "poi.park",
					elementType: "geometry",
					stylers: [{ color: "#263c3f" }],
		  		},
		  		{
					featureType: "poi.park",
					elementType: "labels.text.fill",
					stylers: [{ color: "#6b9a76" }],
		  		},
		  		{
					featureType: "road",
					elementType: "geometry",
					stylers: [{ color: "#38414e" }],
		  		},
		  		{
					featureType: "road",
					elementType: "geometry.stroke",
					stylers: [{ color: "#212a37" }],
		  		},
		  		{
					featureType: "road",
					elementType: "labels.text.fill",
					stylers: [{ color: "#9ca5b3" }],
		  		},
		  		{
					featureType: "road.highway",
					elementType: "geometry",
					stylers: [{ color: "#746855" }],
		  		},
		  		{
					featureType: "road.highway",
					elementType: "geometry.stroke",
					stylers: [{ color: "#1f2835" }],
		  		},
		  		{
					featureType: "road.highway",
					elementType: "labels.text.fill",
					stylers: [{ color: "#f3d19c" }],
		  		},
		  		{
					featureType: "transit",
					elementType: "geometry",
					stylers: [{ color: "#2f3948" }],
		  		},
		  		{
					featureType: "transit.station",
					elementType: "labels.text.fill",
					stylers: [{ color: "#d59563" }],
		  		},
		  		{
					featureType: "water",
					elementType: "geometry",
					stylers: [{ color: "#5382c9" }],
		  		},
		  		{
					featureType: "water",
					elementType: "labels.text.fill",
					stylers: [{ color: "#515c6d" }],
		  		},
		  		{
					featureType: "water",
					elementType: "labels.text.stroke",
					stylers: [{ color: "#5382c9" }],
		  	  	}
			],
		});
		var startmarker = new google.maps.Marker({
			position: new google.maps.LatLng(startlat,startlng),
			map: map,
			label:'S',
			draggable:false
		});
		var endmarker = new google.maps.Marker({
			position: new google.maps.LatLng(endlat,endlng),
			map: map,
			label:'T',
			draggable:false
		});
	};
}
function loadMap(bigstartlat, bigstartlng, bigendlat, bigendlng){
	console.log(bigstartlat, bigstartlng, bigendlat, bigendlng);
	window.initMap = initMap(bigstartlat/10000-90, bigstartlng/10000-180, bigendlat/10000-90, bigendlng/10000-180);
	injectScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDugTSHPjCq4RHm7XFFC-07jptl0v8E3PE&libraries=drawing&v=weekly&callback=initMap').then(() => {
		console.log('Google Maps script loaded');
	}).catch(error => {
		console.error(error);
	});
}
//1297280 750036 1297280 754036