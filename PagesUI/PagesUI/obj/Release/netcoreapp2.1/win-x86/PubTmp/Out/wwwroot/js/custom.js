'use strict'; $(document).ready(function () {
	$('[data-pages="search"]').search({
		searchField: '#overlay-search',
		closeButton: '.overlay-close',
		suggestions: '#overlay-suggestions',
		brand: '.brand',
		onSearchSubmit: function (searchString) {
			console.log("Search for: " + searchString);
		},
		onKeyEnter: function (searchString) {
			console.log("Live search for: " + searchString);
			var searchField = $('#overlay-search');
			var searchResults = $('.search-results');
			clearTimeout($.data(this, 'timer'));
			searchResults.fadeOut("fast");
			var wait = setTimeout(function () {
				searchResults.find('.result-name').each(function () {
					if (searchField.val().length != 0) {
						$(this).html(searchField.val());
						searchResults.fadeIn("fast");
					}
				});
			}, 500);
			$(this).data('timer', wait);
		}
	});
	var slider = new Swiper('#login', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		parallax: true,
		speed: 1000
	});
	var testimonials_slider = new Swiper('#testimonials_slider', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		parallax: true,
		peed: 1000
	});

	$('#start_tour,#start_tour_end').click(function () {
		$("#discover").velocity("scroll", {
			duration: 800
		});
	})

	$('#anchor_contact').click(function () {
		$("#contact").velocity("scroll", {
			duration: 800
		});
	})
})