import * as raeda from "./raeda.js";
import * as utils from "./utils.js";
import * as wallet from "./wallet.js";

$(document).ready(function() {
	if (wallet.isConnected()){
		$('#river-post').removeClass('done');
		$('#connect-prepost').addClass('done');
	}
	fetchLocMap();
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
	let pminprice = $('#postminprice').val();
	let pexp = Math.round(new Date($('#postexp-date').val()+'T'+$('#postexp-time').val()).valueOf()/1000);
	// let pix = $('#poststartloclat').val();
	// let piy = $('#poststartloclng').val();
	// let pfx = $('#postendloclat').val();
	// let pfy = $('#postendloclng').val();
	let pix = 0;
	let piy = 0;
	let pfx = 0;
	let pfy = 0;
	if (pname==''){
		utils.notification('Oops', ['You cannot leave the post name field empty'], true);
	} else if (pminprice==''){
		utils.notification('Oops', ['You cannot leave the min price field empty'], true);
	} else if (parseFloat(pexp)==NaN){
		utils.notification('Oops', ['Expiry time must be a number'], true);
	} else if (parseFloat(pminprice)==NaN){
		utils.notification('Oops', ['Min price must be a number'], true);
	} else if (parseFloat(pix)==NaN || parseFloat(piy)==NaN){
		utils.notification('Oops', ['The start location coordinates must be numbers.'], true);
	} else if (parseFloat(pfx)==NaN || parseFloat(pfy)==NaN){
		utils.notification('Oops', ['The end location coordinates must be numbers.'], true);
	} else {
		// standard used by raeda: 1/10,000 of lat/lng coordinate
		let locmult = 10000; // to be 10000 once rishin has got his act together
		
		let pid = wallet.state.profileid;
		pminprice = parseFloat(pminprice);
		pix = BigInt(parseInt(parseFloat(startlat+90)*locmult));
		piy = BigInt(parseInt(parseFloat(startlng+180)*locmult));
		pfx = BigInt(parseInt(parseFloat(endlat+90)*locmult));
		pfy = BigInt(parseInt(parseFloat(endlng+180)*locmult));
		pexp = BigInt(pexp);
		if (pexp<1677783696){
			utils.notification('Oops', ['The expiry data is in the past.'], true);
		} else {
			utils.notification('Sign wallet then wait :)', ['Complete wallet signature then wait for post to be added to the blockchain – it should be done shortly.']);
			console.log('HEREE',wallet.state.address,pminprice,pname,pid,pix,piy,pfx,pfy,pexp,{postDesc:pdesc});
			raeda.riverPost(wallet.state.address,pminprice,pname,pid,pix,piy,pfx,pfy,pexp,{postDesc:pdesc}).then((v)=>{
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


/// INJECTING GOOGLE MAPS

function injectScript(src) {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = src;
		script.addEventListener('load', resolve);
		script.addEventListener('error', e => reject(e.error));
		document.head.appendChild(script);
	});
}

let startlat = 0;
let startlng = 0;
let endlat = 0;
let endlng = 0;
function fetchLocMap(){
	fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDugTSHPjCq4RHm7XFFC-07jptl0v8E3PE', {
		method: 'post',
		body: JSON.stringify({}),
		headers: {'Content-Type': 'application/json'}
	}).then((res) => res.json()).then((body) => {
		if (!body['error']){
			let loc = body["location"];
			function initMap() {
				startlat = loc['lat'];
				startlng = loc['lng'];
				endlat = loc['lat'];
				endlng = loc['lng']+0.4;
				console.log(startlat,startlng,endlat,endlng)
				const map = new google.maps.Map(document.getElementById("loc-map"), {
					zoom: 9,
					center: { lat: startlat, lng: startlng },
					mapTypeId: "terrain",
					disableDefaultUI: true,
					styles: [
					  { elementType: "geometry", stylers: [{ color: "#243e2f" }] },
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
						stylers: [{ color: "#5382a9" }],
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
					  },
					]
				});
				var startmarker = new google.maps.Marker({
					position: new google.maps.LatLng(startlat,startlng),
					map: map,
					draggable:true,
					label:'A'
				});
				var endmarker = new google.maps.Marker({
					position: new google.maps.LatLng(endlat,endlng),
					map: map,
					draggable:true,
					label:'B'
				});
				google.maps.event.addListener(startmarker, 'dragend', function(evt){
					startlat = evt.latLng.lat();
					startlng = evt.latLng.lng();
				});
				google.maps.event.addListener(endmarker, 'dragend', function(evt){
					endlat = evt.latLng.lat();
					endlng = evt.latLng.lng();
				});
			}
			window.initMap = initMap;
			injectScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDugTSHPjCq4RHm7XFFC-07jptl0v8E3PE&libraries=drawing&v=weekly&callback=initMap').then(() => {
				console.log('Google Maps script loaded');
			}).catch(error => {
				console.error(error);
			});
		} else {
			console.log(body['error']);
		}
	});
}