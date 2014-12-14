'use strict';

Application.Controllers.controller('MainController', ['$rootScope', '$scope', '$q', '$state', '$stateParams', '$timeout', '$location',
    function ($rootScope, $scope, $q, $state, $stateParams, $timeout, $location) {

        $scope.state            = $state.current;
        $scope.stateParams      = $stateParams;

        $rootScope.$on('$stateChangeStart', function(angularEvent, next, nextParams, prev, prevParams) {
            $scope.state            = next;
            $scope.stateParams = nextParams;
        });
    }
]);

