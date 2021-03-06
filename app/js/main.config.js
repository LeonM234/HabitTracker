;(function() {
  "use strict";

  angular.module('trackerApp')
    .config(function($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: "views/landing.html",
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
      .otherwise({redirectTo: "/"});
    })
}());
