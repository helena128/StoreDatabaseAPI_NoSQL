var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
        templateUrl: 'views/home.html'
        })

        .when ('/home', {
            templateUrl: 'views/home.html'
        })

        // people pages - not used in the current version
        /*.when('/people', {
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
        })*/

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


        // purchase
        .when('/purchase', {
            templateUrl: 'views/purchase.html',
            controller: 'PurchaseController'
        })

        // add purchase
        .when('/purchase/add', {
            templateUrl: 'views/add_purchase.html',
            controller: 'PurchaseController'
        })

        // staff
        .when('/staff', {
            templateUrl: 'views/staff.html',
            controller: 'StaffController'
        })

        .otherwise({
            redirectTo: '/home'
        });

}]);