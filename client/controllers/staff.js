var myApp = angular.module('myApp');

myApp.controller('StaffController', [ '$scope', '$http', '$location', '$routeParams', '$routeParams',
        function($scope, $http, $location, $routeParams) {
            console.log('>> PeopleController loaded');

            $scope.getStaff = function () {
                $http.get('/api/staff').then(function (response) {
                    var data = response.data;
                    $scope.staff = data;
                    console.log(data);
                });
            };

            $scope.removeStaff = function (id) {
                $http.delete('/api/staff/' + id).then(function(response) {
                    console.log('Staff deleted');
                    window.location.href="#!staff";
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