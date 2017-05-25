angular.module('starter2', []).controller('MapController2', ['$scope',
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
        $scope.Centrer = function (x, y) {
            $rootScope.map.center = {
                lat: y,
                lng: x,
                zoom: 12
            };
        };


        $scope.setMarker = function (i, image) {

            console.log("Setmarkers")

            $rootScope.local = $rootScope.locationliste[i];
            $rootScope.param.id = $rootScope.local._id;
            $rootScope.param.status = "en_panne";
            $rootScope.param.problemeCG = "rejet_carte";
            $rootScope.param.problemeFond = "fond_indisponible";
            $rootScope.param.problemeMateriel = "ecran_invisible";
          

        };

       // $scope.goToo();

    }
]);