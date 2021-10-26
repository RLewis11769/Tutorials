// Waits until html added to DOM before mapping
document.addEventListener("DOMContentLoaded", function () {
	/* Map */
	// Mapped as Mercator projection
	// Set view at (0, 0) with 2x zoom
	const map = L.map('ISSmap').setView([0, 0], 2);
	// Must add attribution object to use OpenStreetMap (and Leaflet)
	const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
	// Tile pics come from OpenStreetMap API
	const tile_url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	// Tiles are pictures from api to be combined into one image
	const tiles = L.tileLayer(tile_url, { attribution });
	// Add any necessary tiles to map at #ISSmap
	tiles.addTo(map);

	/* Marker */
	// Give marker custom image rather than pin
	const iss_icon = L.icon({
		iconUrl: 'iss.png',
		iconSize: [50, 32],
		iconAnchor: [25, 16]
	});
	// Give marker default value so can update later
	let marker = L.marker([0, 0], { icon: iss_icon }).addTo(map);

	async function getISSData() {
		// Use Bill Shupp's API that tracks the ISS

		// Retrieve data from api url
		const iss_url = 'https://api.wheretheiss.at/v1/satellites/25544';
		const response = await fetch(iss_url);
		// Convert response to json data
		const data = await response.json();
		// Deconstruct object to put in individual variables
		const { latitude, longitude } = data;

		// Vanilla JS to add data in variables as text content of html tags
		document.getElementById('lat').textContent = latitude.toFixed(5);
		document.getElementById('long').textContent = longitude.toFixed(5);

		// Centers map based on location
		map.setView([latitude, longitude], 5);
		// Update marker location based on returned object
		marker.setLatLng([latitude, longitude]).addTo(map);
	}

	// Get data on page load
	getISSData();
	// Get data every 1 second after page load
	setInterval(getISSData, 1000);
});
