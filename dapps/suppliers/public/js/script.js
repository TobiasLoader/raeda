$(document).ready(function() {
});

function buildSearchMap(lat,lng,radius){
	const map = new google.maps.Map(document.getElementById("quick-map"), {
		zoom: 7,
		center: { lat: lat, lng: lng },
		mapTypeId: "terrain",
	});
	const searchCircle = new google.maps.Circle({
		strokeColor: "rgb(83, 130, 201)",
		strokeOpacity: 0.5,
		strokeWeight: 1,
		fillColor: "rgb(83, 130, 201)",
		fillOpacity: 0.35,
		map,
		center: { lat: lat, lng: long },
		radius: radius,
	});
	drawingManager.setMap(map);
}

function initMap() {
	buildSearchMap(37.09,-95.712,10);
}

window.initMap = initMap;
