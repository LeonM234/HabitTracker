;(function() {
  "use strict";

  angular.module('trackerApp')

  // ----- SHOW CONTROLLER -----
  .controller('ShowController', function(habitFactory, FIREBASE_URL, $rootScope, $routeParams, $http, $scope){
    var vm = this;
    var id = $routeParams.id;

    habitFactory.getHabit(id, function(data){
      vm.habit = data;
    });

    // ----- GRID FUNCTIONS -----

    // get habit grid up onto firebase
    var ref = new Firebase(FIREBASE_URL);
    vm.user = $rootScope.user.uid;

    function gridUpload(){
      ref.child('users').child(vm.user).child('habits').child(id).child('grid').set(angular.fromJson(angular.toJson(vm.grid)));
    }

    // local grid
    vm.toggleX = function(row, column){
      if (vm.grid[row][column] === "X"){
        console.log(this);
        vm.grid[row][column] = '';
        vm.percentDone();
        gridUpload();
      } else {
        vm.grid[row][column] = "X";
        vm.percentDone();
        gridUpload();
      }
    };

    // pull grid representation from FB
    var gridLocation = ref.child('users').child(vm.user).child('habits').child(id).child('grid');

    habitFactory.pullGridDown(id, FIREBASE_URL, vm.user, function(data){
      vm.grid = data;
      console.log(vm.grid);
    });

    // calculate percentage completed
    vm.percentDone = function() {
      var habitsCompleted = 0;
      $('#grid-table tr').each(function(){
        $(this).find('td').each(function(){
          if ($(this).text() == "X"){
            habitsCompleted++;
          }
        });
      });
      console.log(habitsCompleted);
      return Math.round(((habitsCompleted)/ 60) * 100);
    };
    })


  // ----- EDIT CONTROLLER -----
  .controller('EditController', function($routeParams, habitFactory){
    var vm = this;
    var id = $routeParams.id;

    habitFactory.getHabit(id, function(data){
      vm.newHabit = data;
    });

    vm.addNewHabit = function(){
      habitFactory.editHabit(id, vm.newHabit);
    };

    vm.difficultyOptions = habitFactory.difficultyOptions;
    vm.habitCategories = habitFactory.habitCategories;

  })

  // ----- HABIT CONTROLLER -----
  .controller('HabitController', function(habitFactory, FIREBASE_URL, $rootScope, $routeParams, $http){
    var vm = this;
    var id = $routeParams.id;

    habitFactory.getAllHabits(function(data){
      vm.habits = data;
    });

    vm.addNewHabit = function(){
      habitFactory.createHabit(vm.newHabit, function(data){
        vm.habits = vm.habits || {};
        vm.habits[data.name] = vm.newHabit;
        vm.newHabit = _freshHabit();
      });
    };

    vm.removeHabit = function(habitId){
      habitFactory.deleteHabit(habitId, function(){
        delete vm.habits[habitId];
      });
    };

    vm.numberOfHabits = function(data){
      for (var key in data){
        console.log(key);
      }
    };

    vm.newHabit = _freshHabit();

    vm.difficultyOptions = habitFactory.difficultyOptions;

    vm.habitCategories = habitFactory.habitCategories;

    function _freshHabit(){
      return {
        difficulty: ''
      };
    }

  });
}());
