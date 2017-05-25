var app = angular.module('starter.controllersRoute', []);
app.controller('routeController', ['$scope', '$state', '$rootScope', '$cordovaGeolocation', '$http', '$ionicPopup', "leafletBoundsHelpers",
  function ($scope, $state, $rootScope, $cordovaGeolocation, $http, $ionicPopup, leafletBoundsHelpers) {

    $scope.goToo = function () {
      $rootScope.map.center = {
        lat: 33.5584125,
        lng: -7.5827284,
        zoom: 12
      };

    };

    $rootScope.changerValeur=function(v){
      var x;
      if(v=="marche"){
        x='Opérationnel';
      }

      if(v=="marche avec defaillance"){
        x='Marche avec des problèmes';  
      }
      if(v=="en panne"){
        x='Défaillant';
      }
      console.log(x);
      return x;
      
    }





    $rootScope.localiserProbleme = function () {

      console.log($rootScope.param.p + "Mapcontroller 2");
      var rayon = Number($rootScope.param.rayon);
      var gb = $rootScope.param.groupeBancaire;
      navigator.geolocation.getCurrentPosition(function (position) {

        $http.get(server + '/locationlist/2/x/' + position.coords.longitude + '/' + position.coords.latitude + '/c').success(function (response) {
          console.log("I got the data I requested from AllATM");
          var locationliste = response;
          $rootScope.locationliste = locationliste;
          $rootScope.map.markers = {};
          console.log('BEFORE ');
          //console.log($rootScope.map.markers);



          if (locationliste.length == 0) {

            $rootScope.pasResultat();
            console.log("rien trouvé");


          }

          else {
            console.log(locationliste.length);
            $rootScope.Resultat(locationliste.length);
            var listLat = new Array();
            var listLng = new Array();

            for (var i = 0; i < $rootScope.locationliste.length; i++) {
              
                            if (locationliste[i].properties.statusActuel.status == "marche") {
              
                              var image = "img/vert.png";
                            }
                            if (locationliste[i].properties.statusActuel.status == "marche avec defaillance") {
              
                              var image = "img/orange.gif";
                            }
              
                            if (locationliste[i].properties.statusActuel.status == "en panne") {
              
                              var image = "img/rouge.gif";
                            }
              
            
              listLng[i] = locationliste[i].geometry.coordinates[0];
              listLat[i] = locationliste[i].geometry.coordinates[1];



              if (locationliste[i].properties.groupeb == "Banque Populaire") {

                var logo = 'img/bplogo.png';

              }

              if (locationliste[i].properties.groupeb == "Attijariwafa Bank") {

                var logo = 'img/tijari.jpg';
              }

              if (locationliste[i].properties.groupeb == "BMCI") {

                var logo = 'img/bmcie.jpg';

              }

              if (locationliste[i].properties.groupeb == "BMCE") {

                var logo = 'img/bmcelogo.png';

              }

              if (locationliste[i].properties.groupeb == "SGMB") {

                var logo = 'img/sgmblogo.jpg';

              }

              if (locationliste[i].properties.groupeb == "CDM") {

                var logo = 'img/cdmlogo.png';

              }

              if (locationliste[i].properties.groupeb == "Poste Maroc") {

                var logo = 'img/postedumaroc.png';
              }

              if (locationliste[i].properties.groupeb == "CIH") {

                var logo = 'img/cihlogo.png';
              }


              
              $rootScope.map.markers[$rootScope.locationliste[i]._id] = {
                lat: $rootScope.locationliste[i].geometry.coordinates[1],
                lng: $rootScope.locationliste[i].geometry.coordinates[0],

                message: "<img style='width:100px;height:40px' src=" + logo + "><br/><p style='font-weight: bold;margin: 0px'>Nom: </p>" + $rootScope.locationliste[i].properties.name + "<p style='font-weight: bold;margin: 0px'>Adresse: </p>" + $rootScope.locationliste[i].properties.adresse + "<br/><p style='font-weight: bold;margin: 0px'>Status: </p>" + $rootScope.changerValeur($rootScope.locationliste[i].properties.statusActuel.status) + "</br><center><div ng-controller='buttonController'><button id='page-button2' style='font-weight: 200;width: 200px;height:10px'  ng-click='afficher();setMarker(" + i + ");Initialiser()'  class='button button-assertive  button-block icon-left ion-android-add-circle'>Signaler un problème</button></div></center>",
                focus: false,
                draggable: false,
                icon: {
                  iconUrl: image,

                  iconSize: [38, 40], // size of the icon
                  shadowSize: [0, 0], // size of the shadow
                  iconAnchor: [22, 40], // point of the icon which will correspond to marker's location
                  shadowAnchor: [0, 0],  // the same for the shadow
                  popupAnchor: [-3, -40] // point from which the popup should open relative to the iconAnchor
                }
              };

              //$scope.goToo()

            }


            $rootScope.map.bounds.northEast.lat = Math.max.apply(this, listLat)+0.0002;
            $rootScope.map.bounds.northEast.lng = Math.max.apply(this, listLng)+0.0002;
            $rootScope.map.bounds.southWest.lat = Math.min.apply(this, listLat)-0.0002;
            $rootScope.map.bounds.southWest.lng = Math.min.apply(this, listLng)-0.0002;


          }
          console.log('AFTER ');


        });

      }, function (err) {
        // error
        console.log("Location error!");
        console.log(err);
      });
    };

    $rootScope.goTo = function (location) {
      $rootScope.map.center.lat = location.geometry.coordinates[1];
      $rootScope.map.center.lng = location.geometry.coordinates[0];
      $rootScope.map.center.zoom = 18;
    };
    
    $rootScope.map = {
      defaults: {
        tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        maxZoom: 18,
        minZoom: 10,
        zoomControlPosition: 'bottomleft',

      },
      markers: {},
      layers: {
        overlays: {


          label: {
            name: "étiquettes",
            type: "xyz",
            url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
            layer: "etiquettes",
            visible: false
          }
        },

        baselayers: {
          
          googleHybrid: {
            name: 'Google Hybrid',
            layerType: 'HYBRID',
            type: 'google'
          },
          googleTerrain: {
            name: 'Google Terrain',
            layerType: 'TERRAIN',
            type: 'google'
          },

          googleRoadmap: {
            name: 'Google Streets',
            layerType: 'ROADMAP',
            type: 'google'
          }
          ,


          street: {
            name: "Streets",
            type: "xyz",
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
            layer: "Streets",
            visible: true
          },

          topo: {
            name: "topographique",
            type: "xyz",
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            layer: "topo",
            visible: true
          },
          Imagerie: {
            name: "Imagerie",
            type: "xyz",
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            layer: "Streets",
            visible: true
          },




        }
      },

      events: {
        map: {
          enable: ['context'],
          logic: 'emit'
        }
      },

      bounds: {

        northEast: {

          lat: 35.9190709,
          lng: 0.0964335
        },

        southWest: {

          lat: 24.0290027,
          lng: -16.7838636
        }
      },

      legend: {
        position: 'bottomleft',
        colors: ['#00ff00', '#F0C300', '#ff0000'],
        labels: ['Opérationnel', 'Marche avec des problèmes', 'En panne']
      }

    };

    $rootScope.verifierGPS_BG = function () {
      $cordovaGeolocation
        .getCurrentPosition()
        .then(function (position) {
          $scope.goBufferGroupe();

        }, function (err) {
          //$rootScope.ActiverGPS();
          $scope.goBufferGroupe();
        });
    };


    $scope.$on("$stateChangeSuccess", function () {


    });



    $scope.showConfirm = function () {

      var confirmPopup = $ionicPopup.confirm({
        title: "Cette fonctionnalité exige l'activation de vetre GPS",
        template: "Voulez vous l'activer?"
      });

      confirmPopup.then(function (res) {
        if (res) {

          cordova.plugins.diagnostic.switchToLocationSettings();
        } else {

        }
      });

    };


    function onError(error) {
      console.error("An error occurred: " + error);
    }


    $scope.ActivationGPS3 = function () {
      cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {

        if (enabled == false) {
          $scope.showConfirm();
        }
        else if (enabled == true) {
          $scope.goMapSignaler();
          $rootScope.localiserProbleme();
        }
      }, onError);

    }


    $scope.ActivationGPS2 = function () {
      cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {

        if (enabled == false) {
          $scope.showConfirm();
        }
        else if (enabled == true) {
          $scope.goBufferGroupe();

        }
      }, onError);

    }


    $scope.ActivationGPSRayon = function () {
      cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {

        if (enabled == false) {
          $scope.showConfirm();
        }
        else if (enabled == true) {
          $scope.goMapBuffer();
          $rootScope.LocaliserRayon();

        }
      }, onError);

    }



    $scope.ActivationGPSLocate = function () {
      cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {

        if (enabled == false) {
          $scope.showConfirm();
        }
        else if (enabled == true) {
          $rootScope.locate();

        }
      }, onError);

    }


    $rootScope.verifierGPS_signaler = function () {
      $cordovaGeolocation
        .getCurrentPosition()
        .then(function (position) {
          $scope.goMapSignaler();
        }, function (err) {

          //$rootScope.ActiverGPS();


        });
    };


    $rootScope.ActiverGPS = function () {
      var notify = {
        type: "error",
        title: "Veuillez activer le GPS",
        content: ""
      };
      $scope.$emit('notify', notify);
    };



    $rootScope.NonModifier = function () {
      var notify = {
        type: "error",
        title: "<center><p >Erreur de signalisation</p></center>",
        content: ""
      };
      $scope.$emit('notify', notify);
    };


    $rootScope.Modifier = function () {
      var notify = {
        type: "success",
        title: "<p >L'opération est bien faite</p>",
        content: ""
      };
      $scope.$emit('notify', notify);
    };



    $rootScope.pasResultat = function () {
      var notify = {
        type: "warning",
        title: "<p >Aucun element trouvé</p>",
        content: ""
      };
      $scope.$emit('notify', notify);
      console.log("pas de resultats message");

    }


    $rootScope.Resultat = function (nombreElement) {
      var notify = {
        type: "info",
        title: "<p>" + nombreElement + "&nbsp;&nbsp;&nbsp;ATM   trouvés</p>",
        content: ""
      };
      $scope.$emit('notify', notify);

    }

    $rootScope.locate = function () {

      navigator.geolocation.getCurrentPosition(function (position) {
        $rootScope.map.center.lat = position.coords.latitude;
        $rootScope.map.center.lng = position.coords.longitude;
        $rootScope.map.center.zoom = 20;

        $rootScope.map.markers.now = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          message: "Vous êtes ici",
          focus: true,
          draggable: false,

          icon: {
            iconUrl: "img/locate.ico",
            shadowUrl: "img/locate.ico",
            iconSize: [38, 50],
            shadowSize: [0, 0],
            iconAnchor: [22, 50],
            shadowAnchor: [0, 0],
            popupAnchor: [-3, -40]
          }
        };

      }, function (err) {


      });
    };

    $rootScope.initiale = function () {

      $rootScope.param.ville = "Selectionner";
      $rootScope.param.groupeBancaire = "Selectionner";
      $rootScope.param.rayon="Selectionner";
    }
    $rootScope.goVilleGroupe = function () {

      $state.go("page-ville-1", {}, { reload: true });
      aleet(navigator.userAgent.match(/Android/));
    
    }


    $scope.goBufferGroupe = function () {

      $state.go("page-ville-2", {}, { reload: true })
    }

    $rootScope.goMapGroupeVille = function () {

      $state.go("app.map", {}, { reload: true })
    
    }

    $rootScope.goMapSignaler = function () {

      $state.go("app2.map2", {}, { reload: true })
    }

    $rootScope.goMapBuffer = function () {

      $state.go("app1.map1", {}, { reload: true })
    }

    $scope.goPageAccueil = function () {

      $state.go("pageAccueil", {}, { reload: true })
    }






    $rootScope.LocaliserRayon = function () {

      $rootScope.param.p = "false";
      var rayon = $rootScope.param.rayon;
      var gb = $rootScope.param.groupeBancaire;
      navigator.geolocation.getCurrentPosition(function (position) {

        $http.get(server + '/locationlist/1/' + rayon + "/" + position.coords.longitude + '/' + position.coords.latitude + '/' + gb).success(function (response) {
          console.log("I got the data I requested from AllATM");
          var locationliste = response;

          $rootScope.locationliste = locationliste;

          $rootScope.map.markers = {};
          console.log('BEFORE ');


          if (locationliste.length == 0) {

            $rootScope.pasResultat();

          }

          else {
            console.log(locationliste.length);
            $rootScope.Resultat(locationliste.length);

            var listLat = new Array();
            var listLng = new Array();

            for (var i = 0; i < locationliste.length; i++) {

              if (locationliste[i].properties.statusActuel.status == "marche") {
 
                 var image = "img/vert.png";
               }
 
               if (locationliste[i].properties.statusActuel.status == "marche avec defaillance") {
 
                 var image = "img/orange.gif";
               }
 
               if (locationliste[i].properties.statusActuel.status == "en panne") {
 
                 var image = "img/rouge.gif";
               }
             



              listLng[i] = locationliste[i].geometry.coordinates[0];
              listLat[i] = locationliste[i].geometry.coordinates[1];





              if (locationliste[i].properties.groupeb == "Banque Populaire") {

                var logo = 'img/bplogo.png';

              }

              if (locationliste[i].properties.groupeb == "Attijariwafa Bank") {

                var logo = 'img/tijari.jpg';

              }

              if (locationliste[i].properties.groupeb == "BMCI") {

                var logo = 'img/bmcie.jpg';

              }

              if (locationliste[i].properties.groupeb == "BMCE") {

                var logo = 'img/bmcelogo.png';

              }

              if (locationliste[i].properties.groupeb == "SGMB") {

                var logo = 'img/sgmblogo.jpg';

              }

              if (locationliste[i].properties.groupeb == "CDM") {

                var logo = 'img/cdmlogo.png';

              }

              if (locationliste[i].properties.groupeb == "Poste Maroc") {

                var logo = 'img/postedumaroc.png';
              }

              if (locationliste[i].properties.groupeb == "CIH") {

                var logo = 'img/cihlogo.png';
              }


              $rootScope.map.markers[locationliste[i]._id] = {
                lat: $rootScope.locationliste[i].geometry.coordinates[1],
                lng: $rootScope.locationliste[i].geometry.coordinates[0],
                message: "<img style='width:100px;height:40px' src=" + logo + "><br/><p style='font-weight: bold;margin: 0px'>Nom: </p>" + $rootScope.locationliste[i].properties.name + "<p style='font-weight: bold;margin: 0px'>Adresse: </p>" + $rootScope.locationliste[i].properties.adresse + "<br/><p style='font-weight: bold;margin: 0px'>Status: </p>" +  $rootScope.changerValeur($rootScope.locationliste[i].properties.statusActuel.status),

                focus: false,
                draggable: false,
                icon: {
                  iconUrl: image,
                  shadowUrl: image,
                  iconSize: [38, 40], // size of the icon
                  shadowSize: [0, 0], // size of the shadow
                  iconAnchor: [22, 40], // point of the icon which will correspond to marker's location
                  shadowAnchor: [0, 0],  // the same for the shadow
                  popupAnchor: [-3, -40] // point from which the popup should open relative to the iconAnchor
                }
              };

            }


            $rootScope.map.bounds.northEast.lat = Math.max.apply(this, listLat)+0.0002;
            $rootScope.map.bounds.northEast.lng = Math.max.apply(this, listLng)+0.0002;
            $rootScope.map.bounds.southWest.lat = Math.min.apply(this, listLat)-0.0002;
            $rootScope.map.bounds.southWest.lng = Math.min.apply(this, listLng)-0.0002;
          }
          console.log('AFTER ');

        });

      }, function (err) {
        // error
        console.log("Location error!");
        console.log(err);
      });
    };




  }
])
