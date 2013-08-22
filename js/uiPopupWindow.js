(function($) {
    var popupWindow = {};
	function startResizeEvt(evt) {
		//disable select text
		popupWindow.backupEvent = null;
		if (navigator.userAgent.indexOf("MSIE") >= 0) {
			if (!popupWindow.resizedPopup && document.onselectstart) {
				popupWindow.backupEvent = document.onselectstart;
			}
			document.onselectstart = function() {return false};		
		} else {		
			if (document.onmousedown) {
				popupWindow.backupEvent = document.onmousedown;
			}
			document.onmousedown = function() {return false};		
		}
		
		var targetPopup = $(evt.target).parents(".uiPopup")[0];
		popupWindow.resizedPopup = targetPopup;
		popupWindow.vresized = getResizeBlock($(targetPopup));
		popupWindow.backupPointerY = findMouseRelativeY(targetPopup, evt);

		var jDoc = $(document);
		jDoc.on("mousemove.UIPopupWindow", resize);
		jDoc.on("mouseup.UIPopupWindow", endResizeEvt);
	}

	function resize(evt) {
		var targetPopup = popupWindow.resizedPopup ;
		var content = popupWindow.vresized;
		var pointerX = findMouseRelativeX(targetPopup, evt);
		var pointerY = findMouseRelativeY(targetPopup, evt);
		var delta = pointerY - popupWindow.backupPointerY;  

		var height = 0;
		content.each(function() {
		  if ($(this).height()) {
			height = $(this).height();
			return;
		  }
		});	      
		if (height + delta > 0) {
			popupWindow.backupPointerY = pointerY;                
			content.height(height + delta);
			content.css("max-height", "");
		}
		targetPopup.style.height = "auto";

		if (pointerX > 230)
		  targetPopup.style.width = (pointerX + 10) + "px";
	}

	function endResizeEvt(evt) {
		popupWindow.resizedPopup = null;
		popupWindow.vresized = null;	     
		$(document).off("mousemove.UIPopupWindow").off("mouseup.UIPopupWindow");

		//enable select text
		if (navigator.userAgent.indexOf("MSIE") >= 0) {
			document.onselectstart = popupWindow.backupEvent;
		} else {                
			document.onmousedown = popupWindow.backupEvent;
		}
		popupWindow.backupEvent = null;
	}
	
	function getResizeBlock(jPopup) {
		var filterPopup = function() {
			return $(this).closest(".uiPopup").attr("id") === jPopup.attr("id");
		};

		jPopup.find(".resizable .resizable").filter(filterPopup).removeClass("resizable");
		var innerRez = jPopup.find(".resizable").filter(filterPopup);
		var contentBlock = jPopup.find("div.PopupContent, .popupContent").filter(filterPopup);

		var vrez;
		if (innerRez.length) {
			vrez = innerRez;
		} else {
			vrez = contentBlock;
		}
		return vrez;	
	}
	
	function findMouseRelativeY(object, e) {
	  var posYObject = $(object).offset().top;
	  if (!e) e = window.event;
	  e = $.event.fix(e);
	  var mouseY = e.pageY;  
	  return  mouseY == -1 ? -1 : mouseY - posYObject ;
	}
	
	function findMouseRelativeX(object, e) {
	  var posXObject = $(object).offset().left;	  
	  if (!e) e = window.event;
	  e = $.event.fix(e);
	  var mouseX = e.pageX;  
	  return mouseX == -1 ? -1 : mouseX - posXObject ;
	}
	
	$(document).off("mousedown.popup.resize").on("mousedown.popoup.resize", ".uiIconResize", function(evt) {
		var resizeBtn = $(evt.target);
		if (resizeBtn.closest(".uiPopup").css("position") === "absolute") {
			startResizeEvt(evt);
		}
	});
})($);