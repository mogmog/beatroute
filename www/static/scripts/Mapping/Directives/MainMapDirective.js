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
                panControl              : true,
                zoomControl             : true,
                mapTypeControl          : true,
                scaleControl            : false,
                streetViewControl       : false,
                overviewMapControl      : false,
                center                  : new google.maps.LatLng(34.397, 150.644),
                zoom                    : 5,
                styles:[
                    {
                        "stylers": [
                            { "weight": 0.1 },
                            { "visibility": "on" }
                        ]
                    },{
                        "featureType": "administrative.locality",
                        "stylers": [
                            { "visibility": "on" },
                            { "weight": 0.1 }

                        ]
                    },{
                        "featureType": "administrative.neighborhood",
                        "stylers": [
                            { "visibility": "on" },
                            { "weight": 0.1 }
                        ]
                    },{
                    }
                ]
            };

        },

        link : function($scope) {

            $scope.overlay      = new google.maps.OverlayView();

            function Route(layer) {

                this.addLine = function () {

                    var points = [
                        [4480, 200],
                        [4580, 400],
                        [4680, 100],
                        [4780, 4300],
                        [4180, 4300],
                        [4280, 4100],
                        [4380, 4400]
                    ];

                    var line = d3.svg.line()
                        .tension(0) // Catmull–Rom
                        .interpolate("cardinal-closed");

                    var svg = layer
                        .datum(points)
                        .attr("width", 960)
                        .attr("height", 500);

                    svg.append("path")
                        .style("stroke", "#ddd")
                        .style("stroke-dasharray", "4,4")
                        .attr("d", line);

                    svg.append("path")
                        .attr("d", line)
                        .call(transition);

                    function transition(path) {
                        path.transition()
                            .duration(7500)
                            .attrTween("stroke-dasharray", tweenDash)
                            .each("end", function() { d3.select(this).call(transition); });
                    }

                    function tweenDash() {
                        var l = this.getTotalLength(),
                            i = d3.interpolateString("0," + l, l + "," + l);
                        return function(t) { return i(t); };
                    }


                }
            }

            $scope.overlay.onAdd = function() {
                $scope.projection = this.getProjection();
                $scope.layer  = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("class", "SvgOverlay").append("svg");

                $scope.route = new Route($scope.layer);

            }

            $scope.overlay.draw = function() {
                var pos1 = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(34.397, 150.644));
                var pos2 = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(34.797, 150.944));
                var pos3 = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(33.797, 151.944));
                var pos4 = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(33.397, 151.944));
                var pos5 = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(33.897, 151.834));
                var pos6 = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(33.647, 151.973));
                var pos7 = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(33.837, 151.921));


                $scope.data = [pos1, pos2, pos3, pos4, pos5, pos6, pos7];


                $scope.route.addLine();


            };

            $scope.overlay.setMap($scope.dcumapping);

        }
    }

});