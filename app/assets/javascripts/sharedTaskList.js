$(function() {
  var $sortPriority = $('#sort-priority');
  var $sortDueDate  = $('#sort-due-date');

  if (window.taskList) {
    var taskList = window.taskList;

    $('#list-name-shared').html(taskList.name);
    renderTaskListOrderPriority(taskList);
  }

  $sortPriority.click(function() {
    renderTaskListOrderPriority(taskList);
  });

  $sortDueDate.click(function() {
    renderTaskListOrderDueDate(taskList);
  });

  function renderTaskListOrderPriority(taskList) {
    var tasks = taskList.tasks.sort(function(a, b) {
      if (a.priority < b.priority) {
        return -1;
      }
      if (a.priority > b.priority) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });

    $sortPriority.addClass('sort-selected');
    $sortDueDate.removeClass('sort-selected');

    renderTaskList(tasks);
  }

  function renderTaskListOrderDueDate(taskList) {
    var tasks = taskList.tasks.sort(function(a, b) {
      if (a.due_date < b.due_date) {
        return -1;
      }
      if (a.due_date > b.due_date) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });

    $sortDueDate.addClass('sort-selected');
    $sortPriority.removeClass('sort-selected');

    renderTaskList(tasks);
  }

  function renderTaskList(tasks) {
    var $listGroup = $('#list-group-shared');
    $listGroup.empty();

    for (var i = 0; i < tasks.length; i++) {
      var $taskLi = $('<li/>', {
        class:  'list-group-item'
      });
      if (tasks[i].completed)
        $taskLi.addClass('completed');

      var $taskCheckboxDiv = $('<div/>', {
        class:  'task-completed'
      });
      var $taskCheckbox = $('<input/>', {
        type:     'checkbox',
        disabled: 'disabled'
      });
      if (tasks[i].completed)
        $taskCheckbox.prop('checked', true);

      $taskCheckboxDiv.append($taskCheckbox);
      $taskLi.append($taskCheckboxDiv);

      var $taskDescriptionDiv = $('<div/>', {
        class:  'task-description'
      });
      var $taskDescription = $('<span/>', {
        text:   tasks[i].description
      });

      $taskDescriptionDiv.append($taskDescription);
      $taskLi.append($taskDescriptionDiv);

      if (tasks[i].due_date) {
        var $taskDueDateDiv = $('<div/>', {
          class:  'task-due-date'
        });
        var $taskDueDate = $('<small/>', {
          text:   'Due date: ' + tasks[i].due_date
        });

        $taskDueDateDiv.append($taskDueDate);
        $taskLi.append($taskDueDateDiv);
      }

      $listGroup.append($taskLi);
    }
  }
});
