/*$(document).ready(function() {

	var $nav = $('.navbar'),
		  $body = $('body'),
		  $window = $(window),
		  $popoverLink = $('[data-popover]'),
		  navOffsetTop = $nav.offset().top,
		  $document = $(document),
		  navHeight = $('.navbar').height(),
		  firstSectionOffset = $($('.section-wrapper')[0]).offset().top;

	function init() {
	  $window.on('scroll', onScroll);
	  $window.on('resize', resize);
	  $('a[href^="#"]').on('click', smoothScroll);
	}

	function resize() {
	  $body.removeClass('has-docked-nav')
	  navOffsetTop = $nav.offset().top
	  onScroll()
	}

	function onScroll() {
	  var scrollPos = $(window).scrollTop();
	  if(scrollPos >= (firstSectionOffset - navHeight) && !$body.hasClass('has-docked-nav')) {
	    $body.addClass('has-docked-nav');
	    $nav.removeClass('almost-docked');
	  }
	  else if(scrollPos >= navHeight + 50 && !$body.hasClass('has-docked-nav')) {
	    $nav.addClass('almost-docked');
	  } else {
	  	$body.removeClass('has-docked-nav');
	  	$nav.removeClass('almost-docked');
	  }
	}

  function smoothScroll(e) {
    e.preventDefault();
    $(document).off("scroll");
    var target = this.hash,
        menu = target;
    $target = $(target);
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top - (navHeight + 20)
    }, 0, 'swing', function () {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
    });
  }


init();

});*/

$( function() {

  // Sticky nav
  var $nav = $('.navbar-container nav'),
  		$firstSection = $($('.section-wrapper')[0]),
  		$navItems = $nav.find('a'),
  		$navHeight = $nav.outerHeight() + 1,
  		firstSectionOffset = $firstSection.offset().top;
    	
  var scrollPos = $(window).scrollTop();

  sticky(scrollPos);

  $(window).on('scroll', function () {

  	scrollPos = $(this).scrollTop();

  	sticky(scrollPos);

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
	$('nav li a').on('click', function(e) {
    // Don't smooth scroll if resume link was clicked
    /*if ($(e.target).hasClass('resume-link')) return;*/

	  e.preventDefault();

	  var thisTarget = $(this).attr('href'),
	  		targetOffset = $(thisTarget).offset().top;

	  $('body').animate({
	    scrollTop: targetOffset - 80
	  }, 400);
	});


});