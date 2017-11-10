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

        /*$scope.addClient = function () {

            // to create client we first need to create people object
            $http.post('/api/people', $scope.human).then(function(response) {
                console.log('People posted');
                //window.location.href="#!people";
            })

            // then we need to find out email of the person we just created
                .then($http.post('/api/peoplemail/' + $scope.human.email).then(function(response) {
                console.log('People posted');
                $scope.peoplemail = response.body._id;
            })

            // and finally we create our client
                .then($http.post('/api/client', $scope.peoplemail).then(function (response) {
                console.log('Client posted');
                window.location.href = "#!client";
                }))
            );
        }*/
    }
    ]
);