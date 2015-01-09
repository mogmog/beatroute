'use strict';

Application.Controllers.controller('PictureOnMapController', ['$rootScope', '$scope', '$q', '$state', '$stateParams', '$timeout', '$location', '$resource',
    function ($rootScope, $scope, $q, $state, $stateParams, $timeout, $location, $resource) {

        var Panario = $resource("http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20&minx=-180&miny=-90&maxx=180&maxy=90&size=thumbnail&mapfilter=true", { callback: "JSON_CALLBACK" },{ get: { method: "JSONP" }});

        $scope.picturesOnMap = Panario.get();

        console.log($scope.picturesOnMap);

    }
]);

