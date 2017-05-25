angular.module('starter3', []).controller('buttonController', ['$scope',
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


        $rootScope.Initialiser = function () {
            $rootScope.param.status = '';
            $rootScope.param.problemeCG = '';
            $rootScope.param.problemeFond = '';
            $rootScope.param.problemeMateriel = '';
            $rootScope.param.autreProbleme = '';
            console.log("Initialiser");



        };


        $scope.eventTrigger = function (e) {
            var notify = {
                type: e.target.getAttribute('data-type'),
                title: e.target.getAttribute('data-title'),
                content: e.target.getAttribute('data-content')
            };
            $scope.$emit('notify', notify);
            console.log("eventTrigger");
        };

        $scope.setMarker = function (i) {

            $rootScope.local = $rootScope.locationliste[i];
            $rootScope.param.id = $rootScope.local._id;
            $rootScope.param.status = "en_panne";
            $rootScope.param.problemeCG = "rejet_carte";
            $rootScope.param.problemeFond = "fond_indisponible";
            $rootScope.param.problemeMateriel = "ecran_invisible";
            console.log("setMarker");



        };


        $scope.ajouterProbleme = function () {

            var status = $rootScope.param.status;
            var problemeCG = $rootScope.param.problemeCG;
            var problemeFond = $rootScope.param.problemeFond;
            var problemeMateriel = $rootScope.param.problemeMateriel;
            var autreProbleme = $rootScope.param.autreProbleme;
            var id = $rootScope.param.id;


            $http.put(server+'/locationlist/' + $rootScope.param.id, $rootScope.param).success(function (response) {
                console.log("I got the data I requested from AJOUTER PROBLEMe");

                console.log(response);

                if(response.nModified==0){

                    $rootScope.NonModifier();
                }

                else{
                         $rootScope.Modifier();
                }
            }); console.log("ajouterProbleme");

        }

        var Location = function () {
            if (!(this instanceof Location)) return new Location();
            this.lat = "";
            this.lng = "";
            this.gb = "Attijari";
            this.adresse = "";
            this.ville = "";
            this.probleme = "";
            this.commentaire = "";
            this.nom = "";
            this.villa = "";
            this.groupeBancaire = "";
            console.log("Location");
        };

    

        $scope.afficher=function(){
             $ionicModal.fromTemplateUrl('templates/addLocation1.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });

            
            console.log("appel");
        }

    }
]);


