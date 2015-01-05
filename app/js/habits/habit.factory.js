;(function() {
  "use strict";

  angular.module('trackerApp')
    .factory('habitFactory', function($rootScope, FIREBASE_URL, $http, $location){

      function _habitsUrl(id){
        if(id) {
          return FIREBASE_URL + '/users/' + $rootScope.user.uid +
          '/habits/' + id + '.json?auth=' + $rootScope.user.token;
        } else {
          return FIREBASE_URL + '/users/' + $rootScope.user.uid +
          '/habits.json?auth=' + $rootScope.user.token;
        }
      }

      function getHabit(id, cb){
        $http.get(_habitsUrl(id))
          .success(function(data){
            cb(data);
          })
          .error(function(err){
            console.log(err);
          });
      }

      function editHabit(id, habit){
        $http.put(_habitsUrl(id), habit)
          .success(function(data){
            $location.path('/habits');
          })
          .error(function(err){
            console.log(err);
          });
      }

      function getAllHabits(cb){
        $http.get(_habitsUrl())
          .success(function(data){
            cb(data);
          })
          .error(function(err){
            console.log(err);
          });
      }

      function createHabit(habit, cb){
        $http.post(_habitsUrl(), habit)
          .success(function(data){
            cb(data);
            $location.path('/habits');
            console.log('sending habit to firebase');
          })
          .error(function(err){
            console.log(err);
          });
      }

      function deleteHabit(habitId, cb){
        $http.delete(_habitsUrl(habitId))
          .success(function(){
            cb();
          })
          .error(function(err){
            console.log(err);
          });
        }

      var difficultyOptions = {
        Easy: 'Easy',
        Medium: 'Medium',
        Rough: 'Rough',
        Spartan: 'Spartan'
      };

      var habitCategories = {
        Health: 'Health',
        Fitness: 'Fitness',
        Mind: 'Mind',
        Skill: 'Skill',
        Removal: 'Remove a Bad Habit',
        Other: 'Other'
      };

      return {
        getHabit: getHabit,
        editHabit: editHabit,
        getAllHabits: getAllHabits,
        createHabit: createHabit,
        deleteHabit: deleteHabit,
        habitCategories: habitCategories,
        difficultyOptions: difficultyOptions
      };
  })
}());
