(function () {
	'use strict';



	angular
		.module('app')
		.controller('contactController', contactController);

	contactController.$inject = ['contactService', '$scope']

	function contactController(contactService, $scope) {
		$scope.validationSettings = {
			rules: {
				phone: {
					tel: true,
					required: true
				},				
				name: {
					required: true
				},				
				email: {
					required: true
				},				
				message: {
					required: true
				}
			}
		};

		$scope.send = function (form) {
			if (!form.validate()){
				return;
			}
			contactService.send(
				$scope.model,
				function () {
					$scope.messageSent = true;
				});
		}

		$scope.reset = function () {
			$scope.messageSent = false;
			$scope.model.message = null;
		}
	}

})();
