$( function() {

  // Sticky nav
  var $nav = $('.navbar-container nav'),
      $mapReception = $('#receptionMap'),
  		$firstSection = $($('.section-wrapper')[0]),
      $receptionMapSection = $('.travel-map-container'),
      $topContainer = $($('.container')[0]),
  		$navItems = $nav.find('a'),
  		$navHeight = $nav.outerHeight() + 1,
  		firstSectionOffset = $firstSection.offset().top,
      receptionMapOffsetTop = $receptionMapSection.offset().top - $navHeight,
      receptionMapOffsetBottom = receptionMapOffsetTop + $receptionMapSection.height() - ($(window).height() - $navHeight - 50),
      receptionMapOffsetLeft = ($('.travel-map-container .squares').outerWidth() + (parseFloat($('.travel-map-container .squares').css('padding-left').replace('px','')) * 2) + parseFloat($('.travel-map-container .map-container').css('margin-left').replace('px','')));
    	

  var scrollPos = $(window).scrollTop();

  sticky(scrollPos);

  $(window).on('scroll', function () {

  	scrollPos = $(this).scrollTop();

  	sticky(scrollPos);
    if ($(window).outerWidth() > 550) {
      stickyMap(scrollPos);
    }

  });

  if ($(window).outerWidth() <= 550) {
    $mapReception.height('400px');
    $('.map-container').height('400px');
    $($('.map-details')[0]).addClass('extra-top-margin');
    makeMap();
  } else {
    $mapReception.height($(window).height() - $navHeight);
    $('.map-container').height($receptionMapSection.height());    
    makeMap();
  }

  function sticky (scrollPos) {
    if (scrollPos >= (firstSectionOffset - ($navHeight + 50))) {
      $nav.attr('class', 'nav-docked');
    } else if (scrollPos >= ($navHeight + 50)) {
      $nav.attr('class', 'nav-almost-docked');
    } else {
      $nav.attr('class', '');
    }
  }

  // Sticky reception map
  function stickyMap (scrollPos) {
    // if scrollpos is within .travel-map-container, add .map-docked to map
    if (scrollPos >= (receptionMapOffsetTop + 25) && scrollPos <= (receptionMapOffsetBottom - $navHeight)) { 
      $mapReception.attr('class', 'map-docked');
      /*$mapReception.css('left', receptionMapOffsetLeft);*/
    } else if (scrollPos > (receptionMapOffsetBottom - $navHeight)) {
      $mapReception.attr('class', 'pin-bottom');
    } else {
      $mapReception.attr('class', '');
      $mapReception.css('left', 0);
    }
  }

  // Resize window
  $(window).on('resize', function () {
  	firstSectionOffset = $firstSection.offset().top;
  	sticky(scrollPos);
  });

  $('#menu-toggle').on('click', function (e) {
    e.preventDefault();
    $('nav').toggleClass('open');
  });

  // Smooth scroll
	$('nav li a, .rsvp-button').on('click', function(e) {
    // Don't smooth scroll if resume link was clicked
    /*if ($(e.target).hasClass('resume-link')) return;*/

	  e.preventDefault();

	  var thisTarget = $(this).attr('href'),
	  		targetOffset = $(thisTarget).offset().top;

	  $('body').animate({
	    scrollTop: targetOffset - 80
	  }, 400);
	});

  // RSVP form actions
  $('#rsvpForm').on('submit', function(e){
    e.preventDefault();

    var baseUrl = 'https://docs.google.com/forms/d/1nbGmqtEjS6JiG-qXflU1iFEXZlewwNndgk6F-Xs8sWs/formResponse?';

    var guestName = encodeURIComponent($('#guestName').val());
    var rsvpChoice = encodeURIComponent($('input[name="rsvp"]:checked').val());
    var numberAttending = encodeURIComponent($('#numberAttending').val());
    var anythingElse = encodeURIComponent($('#anythingElse').val());

    var q0 = 'entry.1175127702'
    var q1 = 'entry.498662007';
    var q2 = 'entry.520185821';
    var q3 = 'entry.817939718';

    var submitRef = '&submit=Submit';
    var submitURL = (baseUrl + q0 + "=" + guestName + "&" + q1 + "=" + rsvpChoice + "&" + q2 + "=" + numberAttending + "&" + q3 + "=" + anythingElse + submitRef);

    var successText = "RSVP Received! We can't wait to celebrate with you. For more details on the big day, please check back on erandan.com.";
    console.log(submitURL);
    $(this)[0].action=submitURL;
    
    function formSubmit() {
      if (!(rsvpChoice === "undefined")) {
        $.post(submitURL, formSuccess());
      } else {
        alert("Please fill let us know if you will attend.")
      }
    }

    function formSuccess() {
      $('form .row').remove();
      $('#input-feedback').text(successText);      
      console.log('success');
    }

    formSubmit();
  });


function makeMap() {
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuc3dpY2siLCJhIjoieUZiWmwtVSJ9.0cPQywdbPVmvHiHJ6NwdXA';
var map = new mapboxgl.Map({
    container: 'receptionMap', // container id
    style: 'mapbox://styles/danswick/cio85vga7001jakm9onnuqk7e', //stylesheet location
    center: [-87.69961783,41.935228526], // starting position
    zoom: 13 // starting zoom
});
map.addControl(new mapboxgl.Navigation({position: 'bottom-left'}));
map.scrollZoom.disable();

var destinations = {
    mapCeremony: {
        bearing: 90,
        center: [-87.703176,41.921123],
        zoom: 16,
        speed: 0.5,
        pitch: 25
    },
    mapReception: {
        bearing: 0,
        center: [-87.698485,41.946875],
        zoom: 16,
        speed: 0.5,
        pitch: 25
    },
    mapOverview: {
        bearing: 0,
        center: [-87.69788068507054,41.930317424097495],
        zoom: 13,
        speed: 0.5,
        pitch: 35
    }

}


    // On every scroll event, check which element is on screen
    window.onscroll = function() {
        var desintaionNames = Object.keys(destinations);
        for (var i = 0; i < desintaionNames.length; i++) {
            var destinationName = desintaionNames[i];
            if (isElementOnScreen(destinationName)) {
                setActiveDestination(destinationName);
                break;
            }
        }
    };

    // set initial view
    var activeDestinationName = "overview";
    function setActiveDestination(destinationName) {
        if (destinationName === activeDestinationName) return;

        map.flyTo(destinations[destinationName]);

        activeDestinationName = destinationName;
    }

    function isElementOnScreen(id) {
        var element = document.getElementById(id);
        var bounds = element.getBoundingClientRect();
        return bounds.top < window.innerHeight && bounds.bottom > 0;
    }
}

});