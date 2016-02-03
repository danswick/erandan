var projectsGeoJson;


function buildFeatures(){
	projectsGeoJson = {
"type": "FeatureCollection",
"features": [

]};
	return projectsGeoJson;
}

$(document).ready(function(){
	buildFeatures();
	console.log(projectsGeoJson);
})