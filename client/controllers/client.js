var myApp = angular.module('myApp');

myApp.controller('ClientController', [ '$scope', '$http', '$location', '$routeParams', '$routeParams',
    function($scope, $http, $location, $routeParams) {
        console.log('>> PeopleController loaded');

        $scope.getClients = function () {
            $http.get('/api/client').then(function (response) {
                var data = response.data;
                $scope.client = data;
                console.log(data);
            });
        };

        $scope.removeClient = function (id) {
            $http.delete('/api/client/' + id).then(function(response) {
                console.log('Client deleted');
                window.location.href="#!client";
            }).catch (function (){
                console.log('Error while deleting');
            })
        };

        $scope.getPeople = function () {
            $http.get('/api/people').then(function(response){
                var data = response.data;
                $scope.people = data;
                console.log(data);
            });
        };

        $scope.addClient = function (id) {
            $http.post('/api/client/' + id).then(function (response) {
                $scope.human = response;
                window.location.href="#!client";
            });
        };
    }
    ]
);