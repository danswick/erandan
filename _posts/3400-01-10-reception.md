---
layout: post
title: Reception
description: The first of the projects
section-id: reception
tags:
categories:
  - sections
---

We're pumped to spend an evening with all of our favorite people. We'll have food to eat, drinks to drinks, great company, and good music to dance to. There may even be a speech or two. 

Join us at **6 pm** for dinner, drinks, and plenty of dancing. 

#### Getting there

<!-- <figure class="section-image">
    <img class="u-max-full-width" src="https://api.mapbox.com/styles/v1/danswick/cio0yit1t003dagkljbja0jsc/static/-87.697947,41.946739,15.15,0.00,45.00/800x250@2x?access_token=pk.eyJ1IjoiZGFuc3dpY2siLCJhIjoieUZiWmwtVSJ9.0cPQywdbPVmvHiHJ6NwdXA">
    <figcaption>Trigger Chicago. 2810 W Addison St.</figcaption>
</figure> -->
<div id="receptionMap" class="section-map"></div>

- <span class="small-icon icon-transit"></span> **Public transportation**
  * Take the whatevs bus
  * Or the other bus
- <span class="small-icon icon-parking"></span> **Driving**
  * Parking is somewhat limited nearby, but you can try parking on California. Please don't park next door! 
- <span class="small-icon icon-car"></span> **Rideshare**
  * Uber or Lyft
  * Cabs exist too
- <span class="small-icon icon-bike"></span> **Bike**
  * Take Divvy! 

#### Attire 

Dress your best, but make sure your shoes are compfortable enough to hit the dance floor.

#### Food and drink

We'll be serving a full meal of delicious walnut loaf and pea soup. We ask that you supply your own croutons. 

Come thirsty, becaue we'll have lots to drink, including a bourbon cocktail, selection of beer, and the finest wines. 

<script type="text/javascript">
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuc3dpY2siLCJhIjoieUZiWmwtVSJ9.0cPQywdbPVmvHiHJ6NwdXA';
var map = new mapboxgl.Map({
    container: 'receptionMap', // container id
    style: 'mapbox://styles/danswick/cio85vga7001jakm9onnuqk7e', //stylesheet location
    center: [-87.698467, 41.946832], // starting position
    zoom: 16 // starting zoom
});
map.addControl(new mapboxgl.Navigation({position: 'top-left'}));
map.scrollZoom.disable();
</script>