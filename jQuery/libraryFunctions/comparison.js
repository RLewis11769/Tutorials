$(document).ready(function() {
		// Replace element - p just means any text not actual <p> tag
		let newText = $("<p>");
		newText.append("<p>Replaced with Vanilla JS</p>");
		$(".replace").html(newText);

		// Replace with jQuery replaceWith
		$('.replaceWith').replaceWith('<h1>Replaced with replaceWith</h1>');

		// Replace with jQuery replace
		// Note: Can specify which parts of element to replace
		$(".justReplace").text($(".justReplace").text().replace("Last", "Replaced with"));


		// Just a filter to find specific text
		// Note: is case-sensitive
		$("p:contains('this')").css("color", "red");

		// Filter to find specific element only within element
		$( "ul" ).find( "p" ).css( "color", "red" );
});
