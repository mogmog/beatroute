'use strict'

var Application = Application || {};

Application.Constants   = angular.module('application.constants',   []);
Application.Services    = angular.module('application.services',    []);
Application.Controllers = angular.module('application.controllers', []);
Application.Filters     = angular.module('application.filters',     []);
Application.Directives  = angular.module('application.directives',  []);

var app = angular.module('WhatToDo', ['ngRoute', 'ui', 'ui.bootstrap', 'ui.router', 'ngResource', 'ngAnimate', 'application.filters', 'application.services', 'application.directives', 'application.constants', 'application.controllers']);

app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('whattodo', {
            url: "/",
            abstract:true ,
            template: "<ui-view></ui-view>"
        })
        .state('whattodo.main', {
            url: '',
            templateUrl: "views/main.html",
            controller: 'MainController',

            resolve : {
                coordinates : ['CoordinateService', function(CoordinateService) {
                    return CoordinateService.get();
                }]
            }

        })

});
