$(document).ready(function() {
	console.log('ready');
});

function initMap() {
  const map = new google.maps.Map(document.getElementById("quick-map"), {
	center: { lat: -34.397, lng: 150.644 },
	zoom: 8,
  });
  const drawingManager = new google.maps.drawing.DrawingManager({
	drawingMode: google.maps.drawing.OverlayType.MARKER,
	drawingControl: true,
	drawingControlOptions: {
	  position: google.maps.ControlPosition.TOP_CENTER,
	  drawingModes: [
		google.maps.drawing.OverlayType.CIRCLE
	  ],
	},
	circleOptions: {
	  fillColor: "rgb(83, 130, 201)",
	  fillOpacity: 0.3,
	  strokeWeight: 0,
	  clickable: true,
	  editable: true,
	  zIndex: 1,
	},
  });
  drawingManager.setMap(map);
}

window.initMap = initMap;
