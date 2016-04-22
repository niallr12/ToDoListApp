angular.module('ToDoList')
.controller('ToDoCtrl', ['$scope','$window', '$ionicPopup', '$ionicListDelegate', function($scope, $window, $ionicPopup, $ionicListDelegate){
    
	//read ToDo items from local storage
    $scope.ToDoItems = JSON.parse($window.localStorage['ToDos'] || '[]');
    
    //add ToDo item
    $scope.addToDo = function(){
      $ionicPopup.prompt({
        title: 'New Task', 
        template: "Enter ToDo:", 
        inputPlaceholder: "What do you need to do?", 
        okText: 'Add ToDo'
      }).then(function(task){
        if(task)
        {
          $scope.ToDoItems.push({name: task, completed: false});
          $scope.numberofToDo++;
          $window.localStorage['ToDos'] = JSON.stringify($scope.ToDoItems);
        }
      })
    }

    //move around ToDo items
    $scope.moveToDo = function(item, fromIndex, toIndex){
      $scope.ToDoItems.splice(fromIndex, 1);
      $scope.ToDoItems.splice(toIndex, 0, item);
    }


    //delete ToDo item
    $scope.deleteToDo = function(index){
      $scope.ToDoItems.splice(index, 1);
      
      //store ToDo array in local storage
      $window.localStorage['ToDos'] = JSON.stringify($scope.ToDoItems);

      //close option buttons after a delete occurs 
      $ionicListDelegate.closeOptionButtons();
    }
}]);