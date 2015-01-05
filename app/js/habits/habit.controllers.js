;(function() {
  "use strict";

  angular.module('trackerApp')

  // ----- SHOW CONTROLLER -----
  .controller('ShowController', function(habitFactory, FIREBASE_URL, $rootScope, $routeParams, $http){
    var vm = this;
    var id = $routeParams.id;

    habitFactory.getHabit(id, function(data){
      vm.habit = data;
    });

    // ----- GRID FUNCTIONS -----

    // Get habit grid up onto firebase
    var ref = new Firebase(FIREBASE_URL);
    vm.user = $rootScope.user.uid;

    var grid = [["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""]];

  /*vm.fbUpdateGrid = function(grid, id){
    var xLocations = ref.child('users').child(vm.user).child('habits').child(id);
    //xLocations.child('habitgrid').set(grid);
    console.log(xLocations);
  };

  function _habitsUrl(id){ debugger
    if(id) {
      return FIREBASE_URL + '/users/' + $rootScope.user.uid +
      '/habits/' + id + '/grid';
    } else {
      $location.path('/');
    }
  }*/

  function gridUpload(id, grid){
    ref.child('users').child(vm.user).child('habits').child(id).child('grid').set(grid)
    /*.success(function(){
      console.log("Set request success!");
    })
    .error(function(err){
      console.log(err);
    });*/
  }

  vm.uploadGrid = function(){
    gridUpload(id, grid);
  };

  vm.updateGridState = function(grid, td){
    var vertical = Math.floor($(td).parent().index());
    var horizontal = $(td).index();
    console.log(vertical);
    if ($(td).hasClass("habit-x")){
      var x = $(td).text("X");
      grid[vertical][horizontal] = "X";
    } else {
      console.log("Nothing here!");
    }
  };

  // Local grid
  $('td').on('click', function(){
    if ($(this).html() === "X"){
      $(this).html("").removeClass("habit-x");
      vm.percentDone();
      vm.updateGridState(grid, this);
      vm.uploadGrid();
    } else {
      $(this).html("X").addClass("habit-x");
      vm.percentDone();
      vm.updateGridState(grid, this);
      vm.uploadGrid();
    }
  });

  // TODO: Loop through firebase grid representation, and populate local grid with X's and the right class

  vm.percentDone = function() {
    var habitsCompleted = 0;
    $('#grid-table tr').each(function(){
      $(this).find('.habit-x').each(function(){
        habitsCompleted++;
      });
    });
    return Math.round((habitsCompleted / 60) * 100);
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
        difficulty: ''
      };
    }



  });
}());
