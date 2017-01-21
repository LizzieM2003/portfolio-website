$(document).ready(function() {
	
	/* For the sticky navigation */
	$('.js--section-me').waypoint(function(direction) {
		if (direction === 'down') {
			$('nav').addClass('sticky');
		} else {
			$('nav').removeClass('sticky');
		}
	}, {
		offset: '60px'
	});
	
	/* Scroll on buttons */
	$('.js--scroll-to-me').click(function() {
		$('html, body').animate({scrollTop: $('.js--section-me').offset().top}, 1000);
	});
	
	$('.js--scroll-to-projects').click(function() {
		$('html, body').animate({scrollTop: $('.js--section-projects').offset().top}, 1000);
	});
	
	/* Navigation scroll */
	
	$(function() {
		$('a[href*="#"]:not([href="#"])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		});
	});
	
	/* Animations on scroll */
	
	$('.js--wp-1').waypoint(function(direction) {
		$('.js--wp-1').addClass('animated slideInUp');
	}, {
		offset: '50%'
	});
	
	$('.js--wp-2').waypoint(function(direction) {
		$('.js--wp-2').addClass('animated fadeIn');
	}, {
		offset: '50%'
	});
	
	/* Mobile navigation */
	
	$('.js--nav-icon').click(function() {
		var nav = $('.js--main-nav');
		var icon = $('.js--nav-icon i');
		
		nav.slideToggle(200);
		icon.toggleClass('ion-navicon-round');
		icon.toggleClass('ion-close-round');
		
	});
});

