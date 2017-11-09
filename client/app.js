var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
        templateUrl: 'views/home.html'
        })

        .when ('/home', {
            //controller: 'PeopleController',
            templateUrl: 'views/home.html'
        })

        .when('/people', {
            templateUrl: 'views/people.html',
            controller: 'PeopleController' // the 1st thing we see
        })

        .when ('/people/add', {
            controller: 'PeopleController',
            templateUrl: 'views/add_people.html'
        })
        .when ('/people/edit/:id', {
            controller: 'PeopleController',
            templateUrl: 'views/edit_people.html'
        })
        .otherwise({
            redirectTo: '/home'
        });

    // store staff client purchase product

}]);