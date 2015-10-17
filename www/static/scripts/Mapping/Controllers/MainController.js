'use strict';

Application.Controllers.controller('MainController', ['$rootScope', '$scope', '$q', '$state', '$stateParams', '$timeout', '$location', 'coordinates',
    function ($rootScope, $scope, $q, $state, $stateParams, $timeout, $location, coordinates) {

        $scope.state            = $state.current;
        $scope.stateParams      = $stateParams;
        $scope.coordinates      = coordinates;

        $rootScope.$on('$stateChangeStart', function(angularEvent, next, nextParams, prev, prevParams) {
            $scope.state            = next;
            $scope.stateParams = nextParams;
        });
    }
]);

