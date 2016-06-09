var app = angular.module('swalty', ['firebase']);

//SE CONNECTER VIA FACEBOOK
app.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
        $state.go('formulaires');
        var ref = new Firebase("https://swaltyapp.firebaseio.com");
        return $firebaseAuth(ref);
    }
]);

//SE CONNECTER VIA FACEBOOK
app.controller("UserController", ["$scope", "Auth",
    function($scope, Auth) {
        $scope.auth = Auth;

        // any time auth status updates, add the user data to scope
        $scope.auth.$onAuth(function(authData) {
            $scope.authData = authData;
        });

        // we would probably save a profile when we register new users on our site
        // we could also read the profile to see if it's null
        // here we will just simulate this with an isNewUser boolean
        var isNewUser = true;

        var ref = new Firebase("https://swaltyapp.firebaseio.com");
        ref.onAuth(function(authData) {
            if (authData && isNewUser) {
                // save the user's profile into the database so we can list users,
                // use them in Security and Firebase Rules, and show profiles
                ref.child("users").child(authData.uid).set({
                    provider: authData.provider,
                    name: getName(authData),
                    fav: 0,
                    sucre: 0,
                    sel: 0
                });
            }
        });

        // find a suitable name based on the meta info given by each provider
        function getName(authData) {
            switch(authData.provider) {
                case 'password':
                    return authData.password.email.replace(/@.*/, '');
                case 'twitter':
                    return authData.twitter.displayName;
                case 'facebook':
                    return authData.facebook.displayName;
            }
        }
    }

]);

//AJOUTER DES RECETTES
app.factory("Recettes", function($firebaseArray) {
    var itemsRef = new Firebase("https://swaltyapp.firebaseio.com/recettes");
    return $firebaseArray(itemsRef);
});


//AJOUTER DES RECETTES
app.controller("AddRecetteController", function($scope, Recettes) {

    $scope.recettes = Recettes;

    $scope.addRecette = function() {
        titre = this.titre;
        description = this.description;
        difficulte = this.difficulte;
        temps = this.temps;
        nbPersonne = this.nbPersonne;
        typeRecette = this.typeRecette;
        categRecette = this.categRecette;

        var ingredient = [
            ingredient1 = this.ingredient1,
            ingredient2 = this.ingredient2,
            ingredient3 = this.ingredient3,
            ingredient4 = this.ingredient4,
            ingredient5 = this.ingredient5,
            ingredient6 = this.ingredient6,
            ingredient7 = this.ingredient7,
            ingredient8 = this.ingredient8,
            ingredient9 = this.ingredient9,
            ingredient10 = this.ingredient10
        ];

        var etape = [
            etape1 = this.etape1,
            etape2 = this.etape2,
            etape3 = this.etape3,
            etape4 = this.etape4,
            etape5 = this.etape5,
            etape6 = this.etape6,
            etape7 = this.etape7,
            etape8 = this.etape8,
            etape9 = this.etape9,
            etape10 = this.etape10
        ];

        $scope.recettes.$add({

            "titre": titre,
            "description": description,
            "difficulte": difficulte,
            "temps": temps,
            "nbPersonne": nbPersonne,
            "ingredient": ingredient,
            "etape": etape,
            "typeRecette": typeRecette,
            "categRecette": categRecette
        });


    };
});

//AJOUTER TITRES
app.factory("Titres", function($firebaseArray) {
    var itemsRef = new Firebase("https://swaltyapp.firebaseio.com/titres");
    return $firebaseArray(itemsRef);
});


//AJOUTER DES TITRES
app.controller("AddTitreController", function($scope, Titres) {

    $scope.titres = Titres;

    $scope.addTitre = function() {
        nomTitre = this.nomTitre;

        $scope.titres.$add({
            "nomTitre": nomTitre
        });
    };
});



