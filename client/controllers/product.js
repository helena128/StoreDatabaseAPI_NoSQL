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
            /*$http.post('/api/product', $scope.pr).then(function(response) {
                console.log(response);
                window.location.href="#!product";
            });*/
        };


        $scope.deselect = function() {
            $scope.pr = "";
        }
    }
]);