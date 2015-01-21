(function($) {
	var collapsible = $("*[data-toggle='collapse']");
	collapsible.each(function() {
		var co = $(this);
		if (co.closest(".popupMessage").length > 0) {
			co.parent().off().on("show hide", function(evt) {
				$(evt.target).prev("a").children("i").toggleClass("uiIconArrowRight uiIconArrowDown");
			});
		}
	});
})($);
