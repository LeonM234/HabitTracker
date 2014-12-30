;(function() {
  "use strict";

  angular.module('trackerApp')

  // ----- SHOW CONTROLLER -----
  .controller('ShowController', function($routeParams, habitFactory){
    var vm = this;
    var id = $routeParams.id;

    habitFactory.getHabit(id, function(data){
      vm.habit = data;
    });
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

  })

  // ----- HABIT CONTROLLER -----
  .controller('HabitController', function(habitFactory){
    var vm = this;

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

    vm.newHabit = _freshHabit();

    vm.difficultyOptions = habitFactory.difficultyOptions;

    function _freshHabit(){
      return {
        medium: 'Medium'
      };
    }

    // ----- OTHER FUNCTIONS -----
    $('td').on('click', function(){
      if ($(this).html() === "X"){
        $(this).html("").removeClass("habit-x");
      } else {
        $(this).html("X").addClass("habit-x");
      }
    });

  });
}());
