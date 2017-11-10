var myApp = angular.module('myApp');

myApp.controller('ProductController', [ '$scope', '$http', '$location', '$routeParams', '$routeParams',
    function($scope, $http, $location, $routeParams) {
        console.log('>> ProductController loaded');

        $scope.getProducts = function(){
            $http.get('/api/product').then(function(response){
                var data = response.data;
                $scope.product = data;
                console.log(data);
            });
        };

        $scope.addProduct = function() {
            console.log($scope.pr);
            $http.post('/api/product', $scope.pr).then(function(response) {
                console.log(response);
                window.location.href="#!collection";
            });
        };

        $scope.removeProduct = function (id) {
            $http.delete('/api/product/' + id).then(function(response) {
                //refresh();
                console.log('Product deleted');
                window.location.href="#!collection";
            }).catch (function (){
                console.log('Error while deleting');
            })
        };

        $scope.updateProduct = function(id) {
            $http.put('/api/product/' + id, $scope.pr).then(function (response) {
                console.log(response);
                window.location.href="#!collection";
            });
        };


        $scope.deselect = function() {
            $scope.pr = "";
        }
    }
]);