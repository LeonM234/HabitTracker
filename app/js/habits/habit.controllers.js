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
    vm.habitCategories = habitFactory.habitCategories;

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

    vm.habitCategories = habitFactory.habitCategories;

    function _freshHabit(){
      return {
        difficulty: 'Medium'
      };
    }

    // ----- GRID FUNCTIONS -----
    $('td').on('click', function(){
      if ($(this).html() === "X"){
        $(this).html("").removeClass("habit-x");
        console.log("habitsCompleted");
      } else {
        $(this).html("X").addClass("habit-x");
        console.log("habitsCompleted");
      }
    });

    vm.percentCompleted = function() {
      var habitsCompleted = 0;

      $('tr').each(function(){
        $(this).find('.habit-x').each(function(){
          habitsCompleted++;
          return habitsCompleted;
        });
      });
    }

  });
}());
