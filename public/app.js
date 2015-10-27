(function(){


  angular.module('focus',[]);


  //task service
  angular.module('focus').factory('taskService', taskService);

  taskService.$inject = ['$http','$log'];

  function taskService(){

    var service = {
      getTasks: getTasks,
      saveTask: saveTask,
      deleteTask: deleteTask
    };

    return service;

    ///

    function getTasks(){

    }

    function saveTask(){

    }

    function deleteTask(){

    }

  }

  //timer controller
  angular.module('focus').controller('TimerCtrl',TimerCtrl);

  TimerCtrl.$inject = ['$scope', '$interval','$log'];

  function TimerCtrl($scope,$interval,$log){
    vm = this;
    vm.timeoutPromise = null;
    var log = $log;

    vm.start = function(){
      $log.log('start');
      vm.timeoutPromise = $interval(vm.updateDisplay, 1000);
    };

    vm.stop = function(){
      $log.log('stop');
      vm.timeoutPromise = $interval.cancel(vm.timeoutPromise);
    };

    vm.reset = function(){
      $log.log('reset');
      vm.elapsed = 0;
    };

    vm.elapsed = 0;
    vm.updateDisplay = function(){
      vm.elapsed++;
      $log.log(vm.elapsed);
    };
  }




})();