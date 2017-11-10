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

        // people pages
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

        // view people details
        .when ('/people/details/:id', {
            controller: 'PeopleController',
            templateUrl: 'views/people_detail.html'
        })

        // update people
        .when ('/people/edit/:id', {
            controller: 'PeopleController',
            templateUrl: 'views/edit_people.html'
        })

        // add people
        .when('/people/add', {
            controller: 'PeopleController',
            templateUrl: 'views/add_people.html'
        })

        // store
        .when('/store', {
            controller: 'StoreController',
            templateUrl: 'views/store.html'
        })

        // collection - aka products
        .when('/collection', {
            templateUrl: 'views/product.html',
            controller: 'ProductController'
        })

        // client
        .when('/client', {
            templateUrl: 'views/client.html',
            controller: 'ClientController'
        })

        // add client
        .when('/client/add', {
            templateUrl: 'views/add_client.html',
            controller: 'ClientController'
        })

        // purchase
        .when('/purchase', {
            templateUrl: 'views/purchase.html'
        })

        // staff
        .when('/staff', {
            templateUrl: 'views/staff.html'
        })

        .otherwise({
            redirectTo: '/home'
        });

    // store staff client purchase product

}]);