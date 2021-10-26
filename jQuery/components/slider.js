$(document).ready(function () {

	// Configuration
	const slideSpeed = 1000;
	const pause = 2000;

	// Global variables
	let currentSlide = 1;
	let interval;

	// Cache DOM to enhance speed/performance
	const $slider = $('#slider');
	const $slideContainer = $slider.find('.slides');
	const $slides = $slideContainer.find('.slide');

	function startSlider() {
		// Set interval equal to function so can call outside of function scope
		interval = setInterval(function () {
			// Move to next slide (which is exactly 720px)
			$slideContainer.animate({
				marginLeft: '-=720px'
			},
				// Set speed of animation between slides to "slideSpeed"
				slideSpeed,
				// After animation completes, call function to advance slide
				function () {
					// Keeps track of current slide
					currentSlide++;
					// If current slide is last slide, reset to first slide
					if (currentSlide === $slides.length) {
						currentSlide = 1;
						$slideContainer.css('margin-left', 0);
					}
				});
			// Set length of pause on each slide to "pause"
		}, pause);
	}

	function pauseSlider() {
		// Passing setInterval function as argument to clearInterval which stops it but saves data
		clearInterval(interval);
	}

	// Pause/resume slider on hover
	$slider.mouseenter(pauseSlider).on('mouseleave', startSlider);

	// Start slider on page load
	startSlider();

});
