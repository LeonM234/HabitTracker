;(function() {
  "use strict";
  angular.module('trackerApp')
    .config(function($routeProvider){
      $routeProvider
        .when('/habits', {
          templateUrl: "views/habits.html",
          controller: "HabitController",
          controllerAs: "habitCtrl",
          private: true
        })
        .when('/grid', {
          templateUrl: "views/grid.html",
          controller: "HabitController",
          controllerAs: "habitCtrl",
          private: true
        })
        .when('/newhabit', {
          templateUrl: "views/newhabit.html",
          controller: "HabitController",
          controllerAs: "habitCtrl",
          private: true
        })
        .when('/stats', {
          templateUrl: "views/stats.html",
          controller: "HabitController",
          controllerAs: "habitCtrl",
          private: true
        })
    })
}());
