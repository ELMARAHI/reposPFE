angular.module('starter.controllers', []).controller('MapController', ['$scope',
    '$cordovaGeolocation',
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$http',
    '$state',
    "$rootScope",
    function (
        $scope,
        $cordovaGeolocation,
        $stateParams,
        $ionicModal,
        $ionicPopup,
        $http,
        $state,
        $rootScope

    ) {


        var Location = function () {
            if (!(this instanceof Location)) return new Location();
            this.lat = "";
            this.lng = "";
            this.gb = "";
            this.adresse = "";
            this.ville = "";
            this.probleme = "";
            this.commentaire = "";
            this.nom = "";
            this.villa = "";
            this.groupeBancaire = "";
        };

        $scope.goToo = function () {
            $rootScope.map.center = {
                lat: 33.5584125,
                lng: -7.5827284,
                zoom: 12
            };
        };





        $scope.LocaliserVille = function () {

            $rootScope.param.p = "true";

            var ville = $rootScope.param.ville;
            var gb = $rootScope.param.groupeBancaire;
            console.log("avant");

            $http.get(server + '/locationlist/' + '0' + '/' + ville + '/' + gb + '/x/y').success(function (response) {
                console.log("I got the data I requested from AllATM");


                var locationliste = response;
                $rootScope.locationliste = locationliste;

                $rootScope.map.markers = {};
                console.log('BEFORE ');

                if (locationliste.length == 0) {

                    $rootScope.pasResultat();
                    console.log("rien trouvé");


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
                       
                        $scope.map.markers[locationliste[i]._id] = {

                            lat: $rootScope.locationliste[i].geometry.coordinates[1],
                            lng: $rootScope.locationliste[i].geometry.coordinates[0],
                            message: "<img style='width:100px;height:40px' src=" + logo + "><br/><p style='font-weight: bold;margin: 0px'>Nom: </p>" + $rootScope.locationliste[i].properties.name + "<p style='font-weight: bold;margin: 0px'>Adresse: </p>" + $rootScope.locationliste[i].properties.adresse + "<br/><p style='font-weight: bold;margin: 0px'>Status: </p>" + $rootScope.changerValeur($rootScope.locationliste[i].properties.statusActuel.status),
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

                    }




                    $rootScope.map.bounds.northEast.lat = Math.max.apply(this, listLat)+0.0002;
                    $rootScope.map.bounds.northEast.lng = Math.max.apply(this, listLng)+0.0002;
                    $rootScope.map.bounds.southWest.lat = Math.min.apply(this, listLat)-0.0002;
                    $rootScope.map.bounds.southWest.lng = Math.min.apply(this, listLng)-0.0002;

   


                }

            });

        };

    }
]);


