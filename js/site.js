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
    stickyMap(scrollPos);

  });

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
    if (scrollPos >= (receptionMapOffsetTop + 50) && scrollPos <= (receptionMapOffsetBottom - $navHeight)) { 
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
	$('nav li a, .cta-button, .rsvp-button').on('click', function(e) {
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

});