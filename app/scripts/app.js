'use strict';

/**
 * @ngdoc overview
 * @name proposalBuilderApp
 * @description
 * # proposalBuilderApp
 *
 * Main module of the application.
 */

 var app = angular.module("proposalBuilderApp", ["firebase"]);

 // let's create a re-usable factory that generates the $firebaseAuth instance
 app.factory("Auth", ["$firebaseAuth",
   function($firebaseAuth) {
     var ref = new Firebase("https://proposal-builder.firebaseio.com");
     return $firebaseAuth(ref);
   }
 ]);

 // and use it in our controller
 app.controller("MainCtrl", ["$scope", "Auth",
   function($scope, Auth) {
     $scope.createUser = function() {
       $scope.message = null;
       $scope.error = null;

       Auth.$createUser({
         email: $scope.registerEmail,
         password: $scope.registerPassword
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
         email: $scope.registerEmail,
         password: $scope.registerPassword
       }).then(function() {
         $scope.message = "User removed";
       }).catch(function(error) {
         $scope.error = error;
       });
     };

     $scope.authWithPassword = function() {
       $scope.message = null;
       $scope.error = null;

       Auth.$authWithPassword({
         email: $scope.loginEmail,
         password: $scope.loginPassword
       }).then(function(authData) {
         console.log("Logged in as:", authData.uid);
       }).catch(function(error) {
         console.error("Authentication failed:", error);
         console.log($scope.loginPassword);
       });
     };
   }
 ]);
