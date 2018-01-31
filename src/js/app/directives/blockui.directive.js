(function () {

	angular.module('app').directive('blockUi', blockUi);

	var template = '<div id="block-ui" style="position:absolute;background:rgba(100,100,100,0.5);width:100%;height:100%"><div class="block-ui-loader"></div></div>';

	function blockUi() {
		return {
			restrict: 'A',
            link: function (scope, element, attrs) {
                element[0].classList.add('block-ui');
                scope.$watch(attrs.blockUi, function (newValue) {
                    if (newValue) {
                        element.prepend(template);
                    } else {
                        element.find('#block-ui').remove();
                    }
                });
            }
		}
	}
})();
