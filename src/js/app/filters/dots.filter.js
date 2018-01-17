(function () {
    'user strict';

    angular
        .module('app')
        .filter('dots', dotsFilter);

    function dotsFilter() {
        return function (value, count) {
            if (!value) {
                return value;
            }

            var dotsCount = count || 3;
            for (var i = value.length - 1; value[i] === '.'; i--) {
                dotsCount--;
            }

            var output = value;
            for (var i = 0; i < dotsCount; i++) {
                output = output + '.';
            }

            return output;
        }
    }
})();