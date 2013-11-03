/*globals angular, alert*/
'use strict';

angular.module('contactsApp', ['ngResource'])

  .config(function ($routeProvider) {

    $routeProvider

      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })

      .when('/view/:id', {
        templateUrl: 'views/view.html',
        controller: 'ViewCtrl'
      })

      .when('/edit/:id', {
        templateUrl: 'views/edit.html',
        controller: 'editCtrl'
      })

      .when('/add', {
        templateUrl: 'views/edit.html',
        controller: 'addCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('contactsApp')
  .service('Contacts', function ($resource, $q, $log) {

    var ContactsResource = $resource('http://192.168.0.196/api/contacts/:id', {id: '@_id'}, {
      query: {method: 'GET', isArray: true}, //returns all customers
      get: {method: 'GET'}, //returns single customer with id
      save: {method: 'POST'}, //adds new customer
      update: {method: 'PUT'}, //updates existing customer with id
      remove: {method: 'DELETE'} //removes a customer with id
    });

    var _logAndReject = function (msg, dfd) {
      $log.error(msg);
      dfd.reject(msg);
    };

    return {

      get : function (_id) {
        var deferred = $q.defer();
        ContactsResource.get({id: _id}, deferred.resolve, function (err) {
          _logAndReject(err, deferred);
        });
        return deferred.promise;
      },

      getAll : function () {
        var deferred = $q.defer();
        ContactsResource.query({}, deferred.resolve, function (err) {
          _logAndReject(err, deferred);
        });
        return deferred.promise;
      },

      remove : function (_id) {
        var deferred = $q.defer();
        ContactsResource.remove({id: _id}, deferred.resolve, function (err) {
          _logAndReject(err, deferred);
        });
        return deferred.promise;
      },

      update : function (data) {
        var deferred = $q.defer();
        ContactsResource.update(data, deferred.resolve, function (err) {
          _logAndReject(err, deferred);
        });
        return deferred.promise;
      },

      add : function (data) {
        var deferred = $q.defer();
        ContactsResource.save(data, deferred.resolve, function (err) {
          _logAndReject(err, deferred);
        });
        return deferred.promise;
      }

    };
  });

angular.module('contactsApp')
  .controller('MainCtrl', function ($scope, Contacts, geolocation) {

    $scope.data = {
      title: 'Contacts',
      contacts : Contacts.getAll()
    };

    $scope.fn = {
      remove : function (_id) {
        Contacts.remove(_id)
          .then(function () {
            $scope.data.contacts = Contacts.getAll();
          });
      },

      geo: function () {
        geolocation.getCurrentPosition(function (position) {
          alert('Latitude: '              + position.coords.latitude          + '\n' +
                'Longitude: '             + position.coords.longitude         + '\n' +
                'Altitude: '              + position.coords.altitude          + '\n' +
                'Accuracy: '              + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: '     + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '               + position.coords.heading           + '\n' +
                'Speed: '                 + position.coords.speed             + '\n' +
                'Timestamp: '             + position.timestamp                + '\n');
        });
      }

    };
  });

angular.module('contactsApp')
  .controller('ViewCtrl', function ($scope, $routeParams, Contacts) {

    Contacts.get($routeParams.id)
      .then(function (res) {
        $scope.data.contact = res;
      });

    $scope.data = {
      title: 'View'
    };
  });

angular.module('contactsApp')
  .controller('editCtrl', function ($scope, $routeParams, Contacts, $location) {

    Contacts.get($routeParams.id)
      .then(function (res) {
        $scope.data.contact = res;
      });

    $scope.data = {
      title: 'Edit'
    };

    $scope.fn = {
      save : function (newData) {
        Contacts.update(newData)
          .then(function () {
            $location.path('/').replace();
          });
      }
    };
  });

angular.module('contactsApp')
  .controller('addCtrl', function ($scope, Contacts, $location) {

    $scope.data = {
      title: 'Add',
      contact: {}
    };

    $scope.fn = {
      save : function (newData) {
        Contacts.add(newData)
          .then(function () {
            $location.path('/').replace();
          });
      }
    };
  });

angular.module('contactsApp')
  .factory('geolocation', function ($rootScope, cordovaReady) {
    return {
      getCurrentPosition: cordovaReady(function (onSuccess, onError, options) {


        navigator.geolocation.getCurrentPosition(function () {
          var that = this,
            args = arguments;

          if (onSuccess) {
            $rootScope.$apply(function () {
              onSuccess.apply(that, args);
            });
          }
        }, function () {
          var that = this,
            args = arguments;

          if (onError) {
            $rootScope.$apply(function () {
              onError.apply(that, args);
            });
          }
        },
        options);
      })
    };
  });

angular.module('contactsApp')
  .factory('cordovaReady', function() {
    return function (fn) {

      var queue = [];

      var impl = function () {
        queue.push(Array.prototype.slice.call(arguments));
      };

      document.addEventListener('deviceready', function () {
        queue.forEach(function (args) {
          fn.apply(this, args);
        });
        impl = fn;
      }, false);

      return function () {
        return impl.apply(this, arguments);
      };
    };
  });
