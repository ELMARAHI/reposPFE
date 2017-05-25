// Ionic Starter App
//var server="http://192.168.43.160:3000";
//var server="http://172.16.1.209:3000";
//var server = "http://192.168.1.108:3000";
//var server = "http://192.168.1.200:3000";
//var server="http://172.16.18.104:3000";
//var server="http://172.20.154.231:3000";
var server="http://127.0.0.1:3000";

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js'starter.button',
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'leaflet-directive','ngCordova.plugins.backgroundGeolocation', 'ngCordova', 'igTruncate', 'starter.controllers', 'angularNotify', 'starter.controllersRoute', 'starter1', 'starter2', 'starter3'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      console.log(window.cordova);
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
       

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('pageAccueil', {
        url: '/pageAccueil',
        templateUrl: 'templates/pageAccueil.html'
      })

      .state('page-ville-1', {
        url: '/page-ville-1',
        templateUrl: 'templates/page-ville-1.html'
      })

      .state('page-ville-2', {
        url: '/page-ville-2',
        templateUrl: 'templates/page-ville-2.html',

      })


      .state('page-list', {
        url: '/page-list',
        templateUrl: 'templates/page-list.html',

      })

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html"
      })

      .state('app.map', {
        url: "/map",
        views: {
          'menuContent': {
            templateUrl: "templates/map.html"
          }
        }
      })


      .state('app1', {
        url: "/app1",
        abstract: true,
        templateUrl: "templates/menu1.html"
      })

      .state('app1.map1', {
        url: "/map1",
        views: {
          'menuContent': {
            templateUrl: "templates/map.html"
          }
        }
      })


      .state('app2', {
        url: "/app2",
        abstract: true,
        templateUrl: "templates/menu2.html"
      })
 


      .state('app2.map2', {
        url: "/map2",
        views: {
          'menuContent': {
            templateUrl: "templates/map.html"
          }
        }
      })

    $urlRouterProvider.otherwise("/pageAccueil");
  })
  .run(["$rootScope", function ($rootScope) {
    $rootScope.param = { ville: "Selectionner", groupeBancaire: "Selectionner", rayon: "Selectionner", status: "", problemeCG: "", problemeFond: "", problemeMateriel: "", autreProbleme: "", id: "", p: false };




  }])

