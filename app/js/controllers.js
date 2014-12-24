;(function() {
  "use strict";

  angular.module('trackerApp')
    // ----- FACTORIES -----
    .factory('authFactory', function($rootScope, $location, FIREBASE_URL){
      var factory = {},
        ref = new Firebase(FIREBASE_URL);

      $rootScope.user = ref.getAuth();

      factory.requireLogin = function(){
        if (!_isLoggedIn()) {
          $location.path('/login');
        }
      };

      factory.disallowLogin = function(){
        if (_isLoggedIn()) {
          $location.path('/');
        }
      };

      function _isLoggedIn(){
        return Boolean(ref.getAuth());
      }

      factory.changePassword = function(oldPass, newPass, cb){
        ref.changePassword({
          email       : ref.getAuth().password.email,
          oldPassword : oldPass,
          newPassword : newPass,
        }, function(error){
          if (error === null){
            console.log("Password changed successfully");
            cb();
          } else {
            console.log("Error changing password:", error);
          }
        }
      );
    };

      factory.login = function(email, pass, cb){
        ref.authWithPassword({
          email    : email,
          password : pass
        }, function(error, authData){
          if (error === null) {
            console.log("User logged in successfully", authData);
            $rootScope.user = authData;
            ref.child('users').child(authData.uid).child('authData').set(authData);
            cb();
          } else {
            console.log("Error logging in user:", error);
          }
        }
      );
    };

      factory.logout = function(cb){
        ref.unauth(function(){
          $rootScope.user = null;
          cb();
        });
      };

      factory.register = function(email, pass, cb){
        ref.createUser({
          email     : email,
          password  : pass
        }, function (error, authData){
          if (error === null) {
            console.log('User created successfully', authData);
            cb();
          } else {
            console.log('Error creating user:', error);
          }
        }
      );
    };

      factory.resetPassword = function(email){
        ref.resetPassword({
          email : email
        }, function(error){
          if (error === null){
            console.log('Password reset email sent successfully');
          } else {
            console.log('Error sending password reset email:', error);
          }
        }
      );
    };
      return factory;
    })

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
