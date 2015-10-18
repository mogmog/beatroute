'use strict';

Application.Controllers.controller('MainController', ['$rootScope', '$scope', '$q', '$state', '$stateParams', '$timeout', '$location', 'days',
    function ($rootScope, $scope, $q, $state, $stateParams, $timeout, $location, days) {

        $scope.state            = $state.current;
        $scope.stateParams      = $stateParams;
        $scope.days      = days;







    }
]);

