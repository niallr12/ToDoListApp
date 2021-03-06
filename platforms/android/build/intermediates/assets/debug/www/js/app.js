// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic.utils'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider){
    $ionicConfigProvider.navBar.alignTitle('center');
})

.controller('ToDoCtrl', ['$scope','$localstorage','$window', '$ionicPopup', '$ionicListDelegate', function($scope, $ionicPopup, $window, $ionicPopup, $ionicListDelegate){
    $scope.ToDoItems = JSON.parse($window.localStorage['ToDos'] || '[]');
    $scope.addTodo = function(item){
      $scope.ToDoItems.push(item);
    };

    $scope.addTask = function(){
      $ionicPopup.prompt({
        title: 'New Task', 
        template: "Enter task:", 
        inputPlaceholder: "What do you need to do", 
        okText: 'Add Task'
      }).then(function(task){
        if(task)
        {
          $scope.ToDoItems.push({name: task, completed: false});
          $scope.numberofToDo++;
          $window.localStorage['ToDos'] = JSON.stringify($scope.ToDoItems);
        }
      })
    }
    $scope.moveItem = function(item, fromIndex, toIndex){
      $scope.ToDoItems.splice(fromIndex, 1);
      $scope.ToDoItems.splice(toIndex, 0, item);
    }

    $scope.deleteItem = function(index){
      $scope.ToDoItems.splice(index, 1);
      $window.localStorage['ToDos'] = JSON.stringify($scope.ToDoItems);
      $ionicListDelegate.closeOptionButtons();
    }


}])