$(document).ready(function() {

	// Append
	$('#btn1').click(function() {
		$('.end').append('<p>End of element<p>');
	});

	// After
	$('#btn2').click(function() {
		$('.end').after('<p>After element<p>');
	});

	// Prepend
	$('#btn3').click(function() {
		$('.begin').prepend('<p>Beginning of element<p>');
	});

	// Before
	$('#btn4').click(function() {
		$('.begin').before('<p>Before element<p>');
	});

	// Remove element based on selector
	$('#btn5').click(function() {
		$('p').remove('#p');
	});

	// Remove entire element
	$('#btn6').click(function() {
		$('.remove').remove();
	});

	// Empty content from element
	$('#btn7').click(function() {
		$('.empty').empty();
	});
});
