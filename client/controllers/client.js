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

        $scope.addClient = function () {

            // to create client we first need to create people object
            $http.post('/api/people', $scope.human).then(function(response) {
                console.log('People posted');
                //window.location.href="#!people";
            }).catch (function (){
                console.log('Error while posting');
            });
        }
    }
    ]
);