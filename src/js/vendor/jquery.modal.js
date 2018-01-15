(function ($) {
	var defaults = {
		overlay: '<div class="overlay"></div>',
		modal: '<div id="modal"><a class="close fa fa-window-close"></a></div>',
		onRenderContent: null
	};

	$.fn.modal = function (settings) {
		var currentSettings = Object.assign({}, defaults, settings);
		var $overlay = $(currentSettings.overlay);
		if (!$overlay.parentElement) {
			$(document.body).append($overlay);
		}

		var $modal = $(currentSettings.modal);
		if (!$modal.parentElement) {
			$($overlay).append($modal);
		}

		var $content = $(this).clone();
		if (currentSettings.onRenderContent){
			$content = currentSettings.onRenderContent($content);
		}

		$modal.append($content)
		$modal.children('a').click(function () {
			$overlay.remove();
		});

		return this;
	}

}(jQuery));