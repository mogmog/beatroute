Application.Directives.directive('mainmap', function ($state, $stateParams, $filter, $location, $q) {

    var styles = [{
        stylers:[{ color: "#ffffff"}, {saturation: -75}, {lightness: -50}]
    }
    ];

    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/static/views/Directives/mainmapdirective.html',
        controller: function($scope) {

            $scope.mapOptions = {
                panControl              : false,
                zoomControl             : true,
                mapTypeControl          : true,
                scaleControl            : false,
                streetViewControl       : false,
                overviewMapControl      : false,
                center                  : new google.maps.LatLng(-34.397, 150.644),
                zoom                    : 17,
                styles:[
                    {
                        "stylers": [
                            { "weight": 0.1 },
                            { "visibility": "off" }
                        ]
                    },{
                        "featureType": "administrative.locality",
                        "stylers": [
                            { "visibility": "on" },
                            { "weight": 4.8 }

                        ]
                    },{
                        "featureType": "administrative.neighborhood",
                        "stylers": [
                            { "visibility": "on" },
                            { "weight": 4.8 }
                        ]
                    },{
                    }
                ]
            };

        },

        link : function($scope) {

            $scope.overlay      = new google.maps.OverlayView();

            function DCUNetworkGraph(layer) {

                this.addNode = function () {

                }
            }

            $scope.overlay.onAdd = function() {
                $scope.projection = this.getProjection();
                var layer  = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("class", "SvgOverlay").append("svg");

                // $scope.graph = new DCUNetworkGraph(layer);
            }

            /*This will run every time user pans, zooms etc. */
            $scope.overlay.draw = function() {

                //$scope.graph.removeallBoundries();
                //$scope.graph.removeAllNodes();
                //$scope.graph.removeallLinks();

                //$scope.dcusToShowOnMap.forEach(function(dcu) {
                //
                //  $scope.graph.addNode(meter, dcu.id, "meter",   true, meterpos.x, meterpos.y)
                //
                //});

            };

            $scope.overlay.setMap($scope.dcumapping);

        }
    }

});