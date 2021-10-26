$("document").ready(function() {

	// Event handlers separated out
	$("button").click(whenMouseIsClicked);
	$("button").on("mouseleave", whenMouseLeaves);

	function whenMouseIsClicked() {
		// ."click"() is the actual important part
		// Could also use .on("click") as seen below
		$("button").html("I've been clicked!");
	}

	function whenMouseLeaves() {
		// .on("mouseleave") is jQuery event handler
		$("button").html("You left me!");
	}


	// Specific click event to show/hide
	$("#show").on("click", function() {
		$(".shide").show();
	});

	$("#hide").on("click", function() {
		$(".shide").hide();
	});


	// Specific click event to fade in/out
	$("#fadein").on("click", function() {
		$(".fade").fadeIn(3000, function() {
			// Callback - when fadeIn is done, alerts
			alert("Fade IN complete");
		});
	});

	$("#fadeout").on("click", function() {
		$(".fade").fadeOut("fast", function() {
			// fadeIn/fadeOut is asynchronous based on time passed in
			alert("Fade OUT complete");
		});
	});


	// Specific click event to toggle in/out (one does both)
	$("#toggle").on("click", function() {
		// slideToggle is also asynchronous but doesn't have callback here
		$(".toggle").slideToggle();
	});


	// Specific click event to move and change font size
	$("#move").on("click", function() {
		// Note: Asynchronous so need {} around properties regardless of one or multiple
		$(".move").animate({ marginLeft: "500px", fontSize: "30px" }, "slow");
	});


	// Specific mouseover event to change background color
	$("#color").on("mouseover", function() {
		// Note: One property, no duration, so don't need {}
		$(".color").css("background-color", "purple");
	});

	// Specific mouseout event to remove background color
	$("#color").on("mouseout", function() {
		// Note: One property, no duration, so don't need {}
		$(".color").css("background", "none");
	});

});
