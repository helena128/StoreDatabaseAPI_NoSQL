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

            $scope.addPurchase = function () {
                $http.post('/api/purchase/', $scope.purchase).then(function (response) {
                    $scope.purchase = response;
                    window.location.href="#!purchase";
                });
            };

            $scope.deselect = function() {
                $scope.purchase = "";
            }
        }
    ]
);