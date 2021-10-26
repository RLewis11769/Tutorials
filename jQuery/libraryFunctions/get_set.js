$(document).ready(function () {

	/*** .text() ***/
	$('#btn1').click(function () {
		// Get method for retrieving value of attribute using text()
		let txt = $('#t1').text();
		alert(txt);
	});

	$('#btn1').click(function () {
		// Set method for setting value of attribute using text()
		$('#t2').text('<b>Hello</b> world')
	});


	/*** .html() ***/
	$('#btn2').click(function () {
		// Get method for retrieving value of attribute using html()
		// Same as text() unless html tags within text
		alert($('#h1').html());
	});

	$('#btn2').click(function () {
		// Set method for setting value of attribute using html() - 
		// Same as text() unless html tags within text
		$('#h2').html('<b>Hello</b> <i>World</i>');
	});


	/*** .val() ***/
	$('#btn3').click(function () {
		// Get method for retrieving value of attribute using html()
		// Same as text() unless html tags within text
		alert($('#v1').val());
	});

	$('#btn3').click(function () {
		// Set method for setting value of attribute using html() - 
		// Same as text() unless html tags within text
		$('#v2').val("I've been changed!");
	});


	/*** .attr() ***/
	$('#btn4').click(function () {
		// Get method for attribute using attr()
		// Format of attrName="attrValue" using attrName
		alert($('#a1').attr('class'));
		alert($('#a1').attr('hello'));
	});

	$('#btn4').click(function () {
		// Set method for adding attributes using attr()
		// Note: this is a dumb way to add class attribute - do it in HTML
		$('#a2').attr({'class': 'class', 'class': 'secondClass'});
		// Note: Do it as BELOW, the one above is overwritten
		// But comment out the below example to demo what happens in first example
		$('#a2').attr('class', 'class secondClass');
	});


	/*** .css() ***/
	$('#btn5').click(function () {
		// Get method for CSS attribute using css()
		alert($('#c1').css('font-family'));
	});

	$('#btn5').click(function () {
		// Set method for CSS attribute using css()
		$('#c2').css('color', 'red');
	});

});
