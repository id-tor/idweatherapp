'use strict';

/* Services */

angular.module('openWeatherApp.services', ['ngResource'])

  .factory('openWeatherMap', function($resource) {

    var apiKey = '279b4be6d54c8bf6ea9b12275a567156';
    var apiBaseUrl = 'http://api.openweathermap.org/data/2.5/';

    return $resource(apiBaseUrl + ':path/:subPath?q=:location',
      {
        APPID: apiKey,
        mode: 'json',
        callback: 'JSON_CALLBACK',
        units: 'metric',
        lang: 'en'
      },
      {
        queryForecastDaily: {
          method: 'JSONP',
          params: {
            path: 'forecast',
            subPath: 'daily'
          },
          isArray: false,
          headers: {
            'x-api-key': apiKey
          }
        }
      }
    )
  });

(function() {
  'use strict';

  angular
    .module('openWeatherApp.services')
    .service('openWeatherAPI', openWeatherAPI);

  openWeatherAPI.$inject = ['$http', '$q'];

  function openWeatherAPI($http, $q) {
    var apiKey = '279b4be6d54c8bf6ea9b12275a567156';
    var apiBaseUrl = 'http://api.openweathermap.org/data/2.5/weather?';

    this.getDataByGeoLocation = function() {
      var geoData = getGeoPosition();

      return angular.isObject(geoData)
        ? $http.get(apiBaseUrl, { params: { APPID: apiKey, lat: geoData.coords.latitude, lon: geoData.coords.longitude } })
        : $q.defer().resolve(null);
    };

    this.getDataByCityName = function(name) {
      return name
        ? $http.get(apiBaseUrl, { params: { APPID: apiKey, q: name }})
        : $q.defer().resolve(null);
    };

    function getGeoPosition() {
      return navigator.geolocation
        ? navigator.geolocation.getCurrentPosition(function(geoData) { return geoData; })
        : null;
    }
  }
})();

