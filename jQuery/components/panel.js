$(document).ready(function(){
	$('.tab-panels .tabs li').click(function () {
		// When click on tab, saves tab-panel group for quick reference
		const panel = $(this).closest('.tab-panels');

		// Searches tab-panel for active class and removes from current tab
		panel.find('.tabs li.active').removeClass('active');
		// Adds active class to clicked tab
		$(this).addClass('active');

		// Saves the index of the clicked tab
		const newcontent = $(this).attr('rel');

		// Search tab-panel group for active class and removes from current content
		panel.find('.panel.active').slideUp(300, function () {
			// Removes existing active class
			$(this).removeClass('active');
			// Adds active class to new tab over the course of 300ms
			$('#' + newcontent).slideDown(300, function(){
				$(this).addClass('active');
			});
		});
	});

});
