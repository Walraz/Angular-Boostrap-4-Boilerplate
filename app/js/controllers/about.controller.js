angular
  .module('app')
  .controller('AboutController', AboutController);

  function AboutController() {
    var vm = this;
    vm.header = 'About';
  }