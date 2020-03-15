const API_KEY = "e9dd1eff918ffd2bc5346da1529f505c";
const COORDS = 'coords';

const weather = document.querySelector(".js-weather");

//Get WEATHER
function getWeather(lat, lng){
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
	).then(function(response){
		return response.json();
	}).then(function(json){
		console.log(json);
		const temperature = json.weather[0].main;
		const place = json.name;
		weather.innerText = `${temperature} @ ${place}`;
	});
}

// Get Location
function handleGeoSuccess(position){
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude
	};
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
	getWeather(latitude, longitude);
}

function handleGeoError(){
	console.log("Can't access geo location");
}

function askForCoords(){
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
	const loadedCoords = localStorage.getItem(COORDS);
	if(loadedCoords === null){
		askForCoords();
	} else {
		const parsedCoords = JSON.parse(loadedCoords);
		getWeather(parsedCoords.latitude, parsedCoords.longitude)
	}
}


function init(){
	loadCoords();
}

init();