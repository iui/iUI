var map;
function loadGMAP(divID)
{
	map = new GMap2(document.getElementById(divID));
	map.setCenter(new GLatLng(52,-5), 5);
	map.setUIToDefault();
}
function loadGeoMAP(divID)
{
	document.getElementById(divID).style.visibility="hidden";
	map = new GMap2(document.getElementById(divID));
	map.setCenter(new GLatLng(52,-5), 5);
	map.setUIToDefault();

	function getPosition(position)
	{
		document.getElementById(divID).style.visibility="visible";
		// GO TO DETECTED POSITION
		map.panTo(new GLatLng(position.coords.latitude, position.coords.longitude));
		map.setZoom(16);
		// CREATE A POINT
	    var point = new GLatLng(position.coords.latitude, position.coords.longitude);
		// RENDER THE POINT ON THE MAP
		map.addOverlay(new GMarker(point));
	}
	
	function errorCallback()
	{
		alert('error');	
	}
	
	navigator.geolocation.getCurrentPosition(getPosition, errorCallback, {maximumAge:600000});

}

//var def12 = document.getElementById('default_map');
//var geo12 = document.getElementById('geo_map');
//def12.addEventListener("focus", function(){ loadGMAP('dmap') }, false);
//geo12.addEventListener("focus", function(){ loadGeoMAP('geomap') }, false);