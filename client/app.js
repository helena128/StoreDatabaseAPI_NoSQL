var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'PeopleController', // the 1st thing we see
        templateUrl: 'views/people.html'
    })
        .when('/people', {
            controller: 'PeopleController', // the 1st thing we see
            templateUrl: 'views/people.html'
        })
        .when ('/people/details/:id', {
            controller: 'PeopleController',
            templateUrl: 'views/people_detail.html'
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
            redirectTo: '/'
        });

    // store staff client purchase product

});