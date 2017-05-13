var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, TwitterService){
	$scope.getUserTweets = function(){
		TwitterService.getUserTweets($scope.users)
		    .then(function(data){
		        $scope.twitterErrors = undefined;
	        	$scope.results = JSON.parse(data.result.userData);
		    })
		    .catch(function(error){
		        console.error('there was an error retrieving data: ', error);
		        $scope.twitterErrors = error.error;
		    })
        console.log($scope.users);
	}
  $scope.users = [];
  $scope.addTwitterUser = function () {
    if( !$scope.users.includes( $scope.twitterUser)) {
        $scope.users.push($scope.twitterUser);
    }
    
    $scope.twitterUser = null;
  }
  $scope.removeTwitterUser = function (x) {
        $scope.users.splice(x, 1);
  } 
  
});

app.factory('TwitterService', function($http, $q){
  
  var getUserTweets = function(users){
    var d = $q.defer();
    $http.post('/twitter/timeline', {users : users})
      .success(function(data){
        console.log('here8');
        return d.resolve(data);
      })
      .error(function(error){
        console.log('here8');
        return d.reject(error);
      });
    return d.promise;
  };

  return {
    getUserTweets : getUserTweets
  }
});