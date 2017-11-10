var myApp = angular.module('myApp');

myApp.controller('PeopleController', [ '$scope', '$http', '$location', '$routeParams', '$routeParams',
    function($scope, $http, $location, $routeParams){
        console.log('>> PeopleController loaded');
        $scope.getPeople = function () {
            $http.get('/api/people').then(function(response){
                var data = response.data;
                $scope.people = data;
                console.log(data);
            });
        };

        $scope.getHuman = function (/*id*/) {
            //console.log(">> People id" + id);
            var id = $routeParams.id;
            $http.get('/api/people/' + id).then(function(response){
                var data = response.data;
                $scope.human = data;
                console.log(data);
                //window.location.href = ("#!people/details/" + id);
            });
        };

        $scope.toPeopleList = function () {
            window.location.href = "#!people";
        };

        $scope.editHuman = function() {
            var id = $routeParams.id;
            $http.put('/api/people/' + id, $scope.human).then(function(response) {
                var data = response.data;
                console.log(data);
                window.location.href = "#!people";
            });
        };

        $scope.removePeople = function (id) {
            $http.delete('/api/people/' + id).then(function(response) {
                //refresh();
                console.log('Book deleted');
                window.location.href="#!people";
            }).catch (function (){
                console.log('Error while deleting');
            })
        };

        $scope.addPeople = function () {
            $http.post('/api/people', $scope.human).then(function(response) {
                //refresh();
                console.log('People posted');
                window.location.href="#!people";
            }).catch (function (){
                console.log('Error while posting');
            })
        }
}]);