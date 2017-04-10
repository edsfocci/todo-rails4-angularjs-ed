angular.module('todoApp').controller "DashboardController", ($scope, $routeParams, $location, TaskList) ->

  $scope.init = ->
    @listsService = new TaskList(serverErrorHandler)
    $scope.lists = @listsService.all()

  $scope.createList = (name) ->
    @listsService.create name: name, (list) ->
        $location.url("/task_lists/#{list.id}")

  $scope.shareList = (list) ->
    FB.ui({
      method: 'share',
      href:   "https://kambda-todo-test.herokuapp.com/task_lists/#{list.id}"
    }, (response) ->
      if (response)
        listsService = new TaskList(serverErrorHandler)
        listsService.update list, {
          id:     list.id,
          share:  true
        }
    )

  $scope.deleteList = (list, index) ->
    result = confirm "Are you sure you want to remove this list?"

    if result
      @listsService.delete list
      $scope.lists.splice index, 1

  serverErrorHandler = ->
    alert("There was a server error, please reload the page and try again.")
