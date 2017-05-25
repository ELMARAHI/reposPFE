angular.module('starter1', []).controller('MapController1', ['$scope',
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

        $scope.$on("$stateChangeSuccess", function () {

           // $scope.LocaliserRayon();

        });


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

      

    }
]);