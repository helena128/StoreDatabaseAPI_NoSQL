var myApp = angular.module('myApp');

myApp.controller('StoreController', [ '$scope', '$http', '$location', '$routeParams', '$routeParams',
    function($scope, $http, $location, $routeParams){
        console.log('>> StoreController loaded');

        $scope.getStore = function () {
            $http.get('/api/store').then(function(response){
                var data = response.data;
                $scope.store = data;
                console.log(data);
            });
        };

        /*
        $scope.getHuman = function (id) {
            $http.get('/api/people/:id').then(function(response){
                var data = response.data;
                $scope.human = data;
                console.log(data);
            });
        };*/

        $scope.removeStore = function (id) {
            $http.delete('/api/store/' + id).then(function(response) {
                //refresh();
                console.log('Store deleted');
                window.location.href="#!store";
            }).catch (function (){
                console.log('Error while deleting');
            })
        };

        $scope.addStore = function() {
            console.log($scope.store);
            $http.post('/api/store', $scope.st).then(function(response) {
                console.log(response);
                window.location.href="#!store";
            });
        };

    }]);