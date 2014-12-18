;(function() {
  "use strict";

  angular.module("trackerApp")
    .config(function($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: "views/landing.html",
        controller: "HabitController",
        controllerAs: "habitCtrl"
      })
      .when('/tracker',{
        templateUrl: "views/tracker.html",
        controller: "HabitController",
        controllerAs: "habitCtrl"
      })
      .when('/stats', {
        templateUrl: "views/stats.html",
        controller: "HabitController",
        controllerAs: "habitCtrl"
      })
      .when('/paths', {
        templateUrl: "views/paths.html",
        controller: "HabitController",
        controllerAs: "habitCtrl"
      })
      .when('/adviceandresources', {
        templateUrl: "views/adviceandresources.html",
        controller: "HabitController",
        controllerAs: "habitCtrl"
      })
      .when('/login', {
        templateUrl: "views/login.html",
        controller: "LoginController",
        controllerAs: "loginCtrl",
        resolve: {
          data: function(authFactory){
            authFactory.disallowLogin();
          }
        }
      })
      .when('/logout', {
        template: '',
        controller: 'LogoutController'
      })
      //.otherwise({redirectTo: "/"});
    })
}());
