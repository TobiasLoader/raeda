import * as wallet from "./wallet.js";
import * as utils from "./utils.js";

$(document).ready(function() {
	fetchSimpleSearchMap();
	$('#search').click(function (){
		lakeSimpleSearch();
	});
	document.getElementById('minprice').addEventListener('keyup', function() {
		let v = document.getElementById('minprice').value;
		if (!isNaN(v)) minprice = parseInt(v);
	
	});
	document.getElementById('maxprice').addEventListener('keyup', function() {
		let v = document.getElementById('maxprice').value;
		if (!isNaN(v)) maxprice = parseInt(v);
	});
});

var minprice = 10;
var maxprice = 100;
var searchlat = 0;
var searchlng = 0;
var searchradius = 10;

function lakeSimpleSearch(){
	if (minprice>maxprice)
		utils.notification('Oops', ['Min price cannot be more than Max price.'], true);
	else 
		fetch('/api/lake-simple-search', {
			method: 'post',
			body:JSON.stringify({
				'lat':searchlat,
				'lng':searchlng,
				'radius':searchradius,
				'minprice':minprice,
				'maxprice':maxprice
			}),
			headers: {'Content-Type': 'application/json'}
		}).then((response) => {
			return response.text();
		}).then((html) => {
			$('#searchtable').html(html);
		});
}

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

function fetchSimpleSearchMap(){
	fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDugTSHPjCq4RHm7XFFC-07jptl0v8E3PE', {
		method: 'post',
		body: JSON.stringify({}),
		headers: {'Content-Type': 'application/json'}
	}).then((res) => res.json()).then((body) => {
		if (!body['error']){
			let loc = body["location"];
			function initMap() {
				searchlat = loc['lat'];
				searchlng = loc['lng'];
				let radius = 1609.34*searchradius;
				const map = new google.maps.Map(document.getElementById("quick-map"), {
					zoom: 9,
					center: { lat: searchlat, lng: searchlng },
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
					  },
					],
				});
				const drawingManager = new google.maps.Circle({
					strokeColor: "rgb(83, 130, 201)",
					strokeOpacity: 0.5,
					strokeWeight: 1,
					fillColor: "rgb(83, 130, 201)",
					fillOpacity: 0.35,
					map,
					draggable: true,
					center: { lat: searchlat, lng: searchlng },
					radius: radius,
				});
				document.getElementById('searchradius').addEventListener('keyup', function() {
					let v = document.getElementById('searchradius').value;
					if (!isNaN(v)){
						searchradius = parseInt(v);
						drawingManager.setRadius(1609.34*searchradius);
					}
					   //document.getElementById('searchradius').value
				});
				google.maps.event.addListener(drawingManager, 'center_changed', function(){
					searchlat = drawingManager.getCenter().lat();
					searchlng = drawingManager.getCenter().lng();
				}); 
				drawingManager.setMap(map);
			}
			window.initMap = initMap;
			injectScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDugTSHPjCq4RHm7XFFC-07jptl0v8E3PE&libraries=drawing&v=weekly&callback=initMap').then(() => {
				console.log('Google Maps script loaded');
				lakeSimpleSearch();
			}).catch(error => {
				console.error(error);
			});
		} else {
			console.log(body['error']);
		}
	});
}