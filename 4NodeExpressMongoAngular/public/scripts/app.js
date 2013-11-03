/*globals angular*/
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

    var ContactsResource = $resource('/api/contacts/:id', {id: '@_id'}, {
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
  .controller('MainCtrl', function ($scope, Contacts) {

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