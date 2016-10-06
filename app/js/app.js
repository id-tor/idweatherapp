(function(){
  'use strict';

// Declare app level module which depends on filters, and services
  angular
    .module('openWeatherApp', [
      'ngRoute',
      'openWeatherApp.filters',
      'openWeatherApp.services',
      'openWeatherApp.directives',
      'openWeatherApp.controllers',
      "iso-3166-country-codes"
    ])
    .config(config);

  // Routes config
  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider.when('/forecast', {
      templateUrl: 'partials/forecast.html',
      controller: 'OpenWeatherCtrl'
    });

    $routeProvider.otherwise({
      redirectTo: '/forecast'
    });
  }

  // Initialize
  angular.element(document).ready(function() {
    angular.bootstrap(document, ['openWeatherApp']);
  });

})();
