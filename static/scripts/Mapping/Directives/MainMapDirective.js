Application.Directives.directive('mainmap', function ($state, $stateParams, $filter, $location, $q) {

    var styles = [{
        stylers:[{ color: "#ffffff"}, {saturation: -75}, {lightness: -50}]
    }
    ];



    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'static/views/Directives/mainmapdirective.html',
        controller: function($scope) {

            $scope.mapOptions = {
                panControl              : false,
                zoomControl             : false,
                mapTypeControl          : true,
                scaleControl            : false,
                streetViewControl       : false,
                overviewMapControl      : false,
                center                  : new google.maps.LatLng(43.50653, 16.44415),
                zoom                    : 15,
                mapTypeId: google.maps.MapTypeId.TERRAIN
            };

        },

        link : function($scope) {

            var overlay = function(map) {
                this.setMap(map);
                this.draw = function() {
                    console.log("super draw")
                }

            }

            overlay.prototype = new google.maps.OverlayView();

            console.log($scope.dcumapping);

            google.maps.event.addListenerOnce($scope.dcumapping, 'idle', function() {
                $scope.overlay = new overlay($scope.dcumapping);
                $scope.overlay2 = new overlay($scope.dcumapping);
                $scope.overlay3 = new overlay($scope.dcumapping);

                $scope.$broadcast('draw');
            });

        }
    }

});