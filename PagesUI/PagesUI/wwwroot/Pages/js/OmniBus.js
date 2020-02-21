(function ($) {

	'use strict';

	$(document).ready(function () {
	    moment.locale("pt-br");
	    $.fn.dataTable.moment('DD/MM/YYYY HH:mm');

	});

})(window.jQuery);

function OmniBusMenu () {
	this.SetMenu = function (pMenuDescription, pSubMenuDescription) {
		$("#li" + pMenuDescription).addClass("open active");
		$("#span" + pMenuDescription).addClass("open arrow");
		$("#li" + pMenuDescription + "Sub" + pSubMenuDescription).addClass("active");
	}
}

var OmniBusMenu = new OmniBusMenu();