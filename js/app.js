var app = angular.module('ToDo',['login']);

		var todoList = [];

		app.controller('todoController',function($scope, $http, $rootScope){

			function fetch(){

				$http.post("php/fetch.php", {'row':$rootScope.userId})
				.then(function (response) {
					console.log(response.data.records);
					console.log('USER '+ $rootScope.userId);


					$scope.todoList = response.data.records;
					for(var i in response.data.records) {
						if($scope.todoList[i].avaliable == 0) {
							$scope.todoList[i].avaliable = false;
						} else {
							$scope.todoList[i].avaliable = true;
						}

						if($scope.todoList[i].done == 0) {
							$scope.todoList[i].done = false;
						} else {
							$scope.todoList[i].done = true;
						}
					}
					todoList.push(response.data.records);

				});
				setTimeout(function(){ 
					if($rootScope.loggedIn == true){
						fetch();
					}
				}, 2000);
			}

			if($rootScope.loggedIn == true){
				fetch();
			}
			
			

			$scope.insertItem = function(){

				
				$scope.deal = $scope.deal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

				if( $scope.deal != '' && $scope.deal != undefined ){

					$http.post("php/insert.php",{'name':$scope.deal, 'done':0, 'avaliable':0, 'row':$rootScope.userId})
					.success(function(data,status,headers,config){
						console.log(data + "data inserted successfully");

						console.log(data);
						console.log($rootScope.userId);
						if(data.avaliable == 0) {
							data.avaliable = false;
						} else {
							data.avaliable = true;
						}

						if(data.done == 0) {
							data.done = false;
						} else {
							data.done = true;
						}

						$scope.todoList.push(data);
					});

				} else {
					console.log('enter smth');
				}
				$scope.deal = '';
			}

			$scope.removeItem = function(index){

				var r = confirm("Are you sure you want to remove?");
				if (r == true) {
				    $http.post("php/remove.php",{'id':$scope.todoList[index].id})
					.success(function(data,status,headers,config){
						console.log(data + "data inserted successfully");

						$scope.todoList.splice(index,1);
					});
				}
			}

			$scope.removeAll = function(index){

				var r = confirm("Are you sure you want to remove ALL records? It will remove ALL your items!");
				if (r == true) {
				    $http.post("php/removeall.php")
					.success(function(data,status,headers,config){
						console.log(data + "data inserted successfully");

						$scope.todoList.splice(0, $scope.todoList.length);
					});
				}
			}

			$scope.changeDone = function(index){
				var doneValue = $scope.todoList[index].done;
				if(doneValue == false) {
					doneValue = 0;
				} else {
					doneValue = 1;
				}

				$http.post("php/changedone.php",{'id':$scope.todoList[index].id, 'done':doneValue})
					.success(function(data,status,headers,config){
						doneValue = data.done;
					});
			}

			$scope.changeAvaliable = function(index){
				var avaliableValue = $scope.todoList[index].avaliable;
				if(avaliableValue == false) {
					avaliableValue = 0;
				} else {
					avaliableValue = 1;
				}

				$http.post("php/changeavaliable.php",{'id':$scope.todoList[index].id, 'avaliable':avaliableValue})
					.success(function(data,status,headers,config){
						avaliableValue = data.avaliable;
					});
			}

			$scope.editItem = function(event, index){
				document.getElementsByClassName("edit-block")[index].style.display = "block";
				document.getElementsByClassName("edit-input")[index].value = $scope.todoList[index].name;
				document.getElementsByClassName("todo-name")[index].style.display = "none";
			}

			$scope.saveItem = function(index){

				var input = document.getElementsByClassName("edit-input");
    			console.log($scope.todoList[index].id);

				$http.post("php/edit.php",{'id':$scope.todoList[index].id, 'name':input[index].value})
					.success(function(data,status,headers,config){
						$scope.todoList[index].name = data.name;
						document.getElementsByClassName("edit-block")[index].style.display = "none";
						document.getElementsByClassName("todo-name")[index].style.display = "block";
					});
			}
			
		});


app.controller('logoutCtrl',function($scope, $http, $rootScope, $location){
	$scope.logout = function(){
		$http.post("php/logout.php", {'userId':$rootScope.userId})
				.then(function (response) {
					console.log(response.data)
					if(response.data == 'nocookies') {
						$rootScope.userId = 'nocookies';
						$rootScope.loggedIn = false;
						console.log($rootScope.loggedIn);
						console.log($rootScope.userId);
						$location.path('/');
					}

		});
	}
});