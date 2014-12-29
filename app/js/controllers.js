;(function() {
  "use strict";

  angular.module('trackerApp')

    // ----- CONTROLLERS -----
    .controller('HabitController', function($http, $routeParams){
      var vm = this;
      var id = $routeParams.id;

      $('td').on('click', function(){
        if ($(this).html() === "X"){
          $(this).html("").removeClass("habit-x");
        } else {
          $(this).html("X").addClass("habit-x");
        }
      })
  })

  // Add ChangePasswordController
    .controller('LoginController', function(authFactory, $scope, $location){
      var vm = this;

      vm.login = function(){
        authFactory.login(vm.email, vm.password, function(){
          $location.path('/');
          $scope.$apply();
        });
      };

      vm.register = function(){
        authFactory.register(vm.email, vm.password, function(){
          vm.login();
        });
      };

      vm.forgotPassword = function(){
        authFactory.resetPassword(vm.email);
      };

    })

    .controller('LogoutController', function($scope, $location, authFactory){
      authFactory.logout(function(){
        $location.path('/');
        $scope.$apply();
      })
    })
}());
