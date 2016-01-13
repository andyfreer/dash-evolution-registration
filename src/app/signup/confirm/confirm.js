angular.module('signup.confirm', [])

	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('root.signup.confirm', {
				url: '/confirm/:from/:to/:code',
				views: {
					'main@root': {
						templateUrl: 'signup/confirm/confirm.tpl.html',
						controller: 'ConfirmCtrl as confirmCtrl'
					}
				}
			});
	}])

	.controller('ConfirmCtrl', ['$scope', '$log', '$stateParams', '$state', 'UserService', function ($scope, $log, $stateParams, $state, UserService) {
		var confirmCtrl = this,
			from = $stateParams.from,
			to = $stateParams.to,
			code = $stateParams.code;

		if(!from || !to || !code){
			$state.go('root.home');	
		} else {
			UserService.validate(from,to,code).then(function(response){
				$log.log('validate() response', response);
				if(response.error_id){
					var errors = [];
					errors.push(response.error_message);
					$rootScope.$broadcast('ErrorAlert',errors);
					return;
				}
				confirmCtrl.success = true;
			});
		}

	}])

;