var $           = require('jquery');
var bootstrap   = require('bootstrap4-plus-jquery');
var angular     = require('angular');
var route       = require('angular-route');
var templates   = require('./templates');

var greet       = require('./greeting');

let siteName    = 'My Boilerplate';

angular.module('app', [route, 'templates']);

angular.module('app').config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'HomeCtrl'
    })
    .when('/about', {
      templateUrl: 'about.html',
      controller: 'AboutCtrl'
    });
    $locationProvider.html5Mode(true);
}]);

angular.module('app').controller('MainCtrl', ['$scope', function($scope){

}]);

angular.module('app').controller('HomeCtrl', ['$rootScope', function($rootScope){
  $rootScope.pageTitle = siteName + ' | Home';
}]);

angular.module('app').controller('AboutCtrl', ['$rootScope', function($rootScope){
  $rootScope.pageTitle = siteName + ' | About';
}]);

$('h1').html(greet('Rasmus'));
let lol = 'JavaScript Working';
var fn = (logThis) => {
  console.log(logThis);
};

fn(lol);
