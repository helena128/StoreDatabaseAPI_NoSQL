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
    }
    ]
);