(function ($) {
	var defaults = {
		locker: '.hhh',
		modal: '#eeee'
	};
	
	$.fn.modal = function (settings) {
		var currentSettings = Object.assign({}, defaults, settings);
		var $locker = $('<div class="locker"></div>');
		$(document.body).append($locker);
		
		var $modal = $(document.body).append($('<div id="modal"><a class="fa fa-window-close"  href="#"></a></div>'));
		$(document.body).append($modal);
		$locker.show();
		var childHtml = $(this).html();
		var child = $('<div/>')
			.addClass(this.className)
			.append(childHtml);
		$(currentSettings.modal).append(child);

		$(currentSettings.modal + ' > a').click(function () {
			$(currentSettings.locker + ',' + currentSettings.modal).hide();
			$(currentSettings.modal)
				.children('div')
				.remove();
		});
	}

}(jQuery));
