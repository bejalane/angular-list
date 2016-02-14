(function(){

var app = angular.module('login',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'login.html'
	})
	.when('/dashboard', {
		resolve: {
			"check": function($location, $rootScope){
				if(!$rootScope.loggedIn) {
					$location.path('/');
				}
			}
		},
		templateUrl: 'list.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});

app.controller('loginCtrl', function($scope, $location, $rootScope, $http){

	function checkCockie(){
		$http.post("php/checkcookie.php",{'uname':$scope.username, 'pass':$scope.password })
		.success(function(data,status,headers,config){
			if( data != 'continue' ) {
				$rootScope.userId = data;
				$rootScope.loggedIn = true;
				console.log($rootScope.loggedIn);
				$location.path('/dashboard');
			} else {
				console.log('no cookies');
			}
		});
	}

	checkCockie();

	$scope.submit = function(){
		$http.post("php/login.php",{'uname':$scope.username, 'pass':$scope.password })
		.success(function(data,status,headers,config){
			if( data == 'not' ) {
				alert('wrong stuff!');
			} else if (data.length > 10) {
				console.log('coockie problem!');
				window.location = '/angular-list/';
			} else {
				$rootScope.userId = data;
				$rootScope.loggedIn = true;
				console.log($rootScope.loggedIn);
				console.log('data = '+data+' rs= '+$rootScope.userId);
				$location.path('/dashboard');
			}
		});

		/*var uname = $scope.username;
		var password = $scope.password;
		if($scope.username == 'admin' && $scope.password == 'admin') {
			$rootScope.loggedIn = true;
			$location.path('/dashboard');
		} else {
			alert('wrong stuff!');
		}*/
	}
});


})();