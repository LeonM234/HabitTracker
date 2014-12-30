;(function() {

  angular.module('trackerApp')

  .config(function($routeProvider){
    $routeProvider
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
      .when('changepassword', {
        templateUrl: "views/changepassword.html",
        controller: "ChangePasswordController",
        controllerAs: "changepwCtrl",
        private: true
      })
    })
    .run(function($rootScope, authFactory){
      $rootScope.$on('$routeChangeStart', function(event, nextRoute, priorRoute){
        if(nextRoute.$$route && nextRoute.$$route.private){
          authFactory.requireLogin();
        }
      })
    })
}());
