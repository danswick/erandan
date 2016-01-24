---
---

var projectsGeoJson;


function buildFeatures(){
	projectsGeoJson = {
"type": "FeatureCollection",
"features": [
{% for post in site.categories.projects %}
	{% if forloop.last %}
		{
			"type": "Feature",
			"properties": {
				"title": "{{ post.title }}",
				"id": "{{ post.projectId }}"
			},
			"geometry": {
				"type": "Point",
				"coordinates": [{{ post.center }}]
			}	
		}
	{% else %}
		{
	      "type": "Feature",
	      "properties": {
	      	"title": "{{ post.title }}",
			"id": "{{ post.projectId }}"
	      },
	      "geometry": {
	        "type": "Point",
	        "coordinates": [{{ post.center }}]
	      }
	    },
	{% endif %}
{% endfor %}
]};
	return projectsGeoJson;
}

$(document).ready(function(){
	buildFeatures();
	console.log(projectsGeoJson);
})