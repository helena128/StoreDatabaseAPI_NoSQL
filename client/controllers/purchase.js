var myApp = angular.module('myApp');

myApp.controller('PurchaseController', [ '$scope', '$http', '$location', '$routeParams', '$routeParams',
        function($scope, $http, $location, $routeParams) {
            console.log('>> PeopleController loaded');

            $scope.getPurchase = function () {
                $http.get('/api/purchase').then(function (response) {
                    var data = response.data;
                    $scope.purchase = data;
                    console.log(data);
                });
            };

            $scope.removePurchase = function (id) {
                $http.delete('/api/purchase/' + id).then(function(response) {
                    console.log('Purchase deleted');
                    window.location.href="#!purchase";
                }).catch (function (){
                    console.log('Error while deleting');
                })
            };

            /*
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
            };*/
        }
    ]
);