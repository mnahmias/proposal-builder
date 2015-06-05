'use strict';

/**
 * @ngdoc function
 * @name proposalBuilderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the proposalBuilderApp
 */
 var app = angular.module("sampleApp", ["firebase"]);

 // let's create a re-usable factory that generates the $firebaseAuth instance
 app.factory("Auth", ["$firebaseAuth",
   function($firebaseAuth) {
     var ref = new Firebase("https://docs-sandbox.firebaseio.com");
     return $firebaseAuth(ref);
   }
 ]);

 // and use it in our controller
 app.controller("SampleCtrl", ["$scope", "Auth",
   function($scope, Auth) {
     $scope.createUser = function() {
       $scope.message = null;
       $scope.error = null;

       Auth.$createUser({
         email: $scope.email,
         password: $scope.password
       }).then(function(userData) {
         $scope.message = "User created with uid: " + userData.uid;
       }).catch(function(error) {
         $scope.error = error;
       });
     };

     $scope.removeUser = function() {
       $scope.message = null;
       $scope.error = null;

       Auth.$removeUser({
         email: $scope.email,
         password: $scope.password
       }).then(function() {
         $scope.message = "User removed";
       }).catch(function(error) {
         $scope.error = error;
       });
     };
   }
 ]);
