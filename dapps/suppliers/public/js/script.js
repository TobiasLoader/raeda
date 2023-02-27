$(document).ready(function() {
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

fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDugTSHPjCq4RHm7XFFC-07jptl0v8E3PE', {
	method: 'post',
	body: JSON.stringify({}),
	headers: {'Content-Type': 'application/json'}
}).then((res) => res.json()).then((body) => {
	if (!body['error']){
		let loc = body["location"];
		function initMap() {
			let lat = loc['lat'];
			let lng = loc['lng'];
			let radius = 1609.34*10;
			console.log(lat,lng,radius);
			const map = new google.maps.Map(document.getElementById("quick-map"), {
				zoom: 9,
				center: { lat: lat, lng: lng },
				mapTypeId: "terrain",
				disableDefaultUI: true
			});
			const drawingManager = new google.maps.Circle({
				strokeColor: "rgb(83, 130, 201)",
				strokeOpacity: 0.5,
				strokeWeight: 1,
				fillColor: "rgb(83, 130, 201)",
				fillOpacity: 0.35,
				map,
				draggable: true,
				center: { lat: lat, lng: lng },
				radius: radius,
			});
			document.getElementById('searchradius').addEventListener('keyup', function() {
				console.log('eve');
				let v = document.getElementById('searchradius').value;
				console.log(v)
				if (!isNaN(v)){
					drawingManager.setRadius(1609.34*parseInt(v));
				}
				   //document.getElementById('searchradius').value
			});
			drawingManager.setMap(map);
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