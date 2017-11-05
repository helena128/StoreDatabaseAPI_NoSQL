var myApp = angular.module('myApp');

myApp.controller('PeopleController', [ '$scope', '$http', '$location', '$routeParams', '$routeParams',
    function($scope, $http, $location, $routeParams){
        console.log('>> PeopleController loaded');
        /*$http.get('/api/people').then(function(response){
            var data = response.data;
            $scope.people = data;
            console.log(data);
        }
        $http.get('/api/people/:_id').then(function (response) {
            $scope.people = data;
            console.log(response.data);
        })*/
        $scope.getPeople = function () {
            $http.get('/api/people').then(function(response){
                var data = response.data;
                $scope.people = data;
                console.log(data);
            });
        }

        $scope.getHuman = function () {
            $http.get('/api/people/:id').then(function(response){
                var data = response.data;
                $scope.human = data;
                console.log(data);
            });
        }
}]);