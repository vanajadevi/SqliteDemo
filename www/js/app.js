// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var db = null;
angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform,$cordovaSQLite,$window) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    db =  window.openDatabase("Db.db", "1.0", "Demo", 1);
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
  });
})
  .controller('AccountController', function($scope, $cordovaSQLite) {

  $scope.accounts = function() {
    var query = "SELECT * FROM people";
    $scope.results=[];
    $cordovaSQLite.execute(db, query,[]).then(function(result)
      {
        if(result.rows.length )
        {
         for(var i=0; i<result.rows.length; i++){
          $scope.results.push(result.rows.item(i));
        } 
        alert(JSON.stringify($scope.results));
        }
        else
        {
          console.log(" NO results found ");
        }
      },function(error){
        console.log(error);
      })
      };
 

  $scope.addAccount = function(){
    var query = "INSERT INTO people (firstname, lastname) VALUES (?, ?)";
    $cordovaSQLite.execute(db, query, [$scope.firstnameText, $scope.lastnameText]);
    $scope.firstnameText = '';
    $scope.lastnameText = '';
  }

 
});
