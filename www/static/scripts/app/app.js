'use strict'

var Application = Application || {};

Application.Constants   = angular.module('application.constants',   []);
Application.Services    = angular.module('application.services',    []);
Application.Controllers = angular.module('application.controllers', []);
Application.Filters     = angular.module('application.filters',     []);
Application.Directives  = angular.module('application.directives',  []);

var app = angular.module('WhatToDo', ['ngRoute','ui', 'ui.router', 'ngResource', 'application.filters', 'application.services', 'application.directives', 'application.constants', 'application.controllers']);

app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('whattodo', {
            url: "/",
            abstract:true ,
            template: "<ui-view></ui-view>"
        })

        .state('whattodo.main', {
            url: 'map',

            resolve: {
                days: function($stateParams, DayService, $q) {

                    var day1 =  DayService.get({id : 3}).$promise;
                    var day2 =  DayService.get({id : 3}).$promise;

                    return $q.all([day1]).then(function(results) {
                        return results.map(function(result) {

                            return (result.features[0].geometry.coordinates.map(function(coordinate) {
                                return  {x : 0, y: 0, geo : {longitude : coordinate[0],  latitude : coordinate[1]}}
                            }));



                        });
                    });

                }

            },

            //templateUrl: '/main/category/ribbon',
            templateUrl: "views/main.html",

            controller: 'MainController'

        })

});
