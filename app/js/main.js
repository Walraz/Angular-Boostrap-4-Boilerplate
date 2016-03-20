var angular     = require('angular');
var route       = require('angular-route');
var $           = require('jquery');
require('bootstrap4-plus-jquery');
require('./templates');

angular.module('app', [route, 'templates']);

angular
  .module('app')
  .config(config);

function config($routeProvider, $locationProvider) {
  
  $routeProvider

  .when('/', {
    templateUrl: 'home.html',
    controller: 'HomeController',
    controllerAs: 'vm'
  })

  .when('/about', {
    templateUrl: 'about.html',
    controller: 'AboutController',
    controllerAs: 'vm'
  });

  $locationProvider.html5Mode(true);
}

require('./controllers/home.controller');
require('./controllers/about.controller');
