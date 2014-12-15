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

                this.addLine = function (x, y) {

                    var points = [
                        [4480, 4200],
                        [4580, 4400],
                        [4680, 4100],
                        [4780, 4300],
                        [4180, 4300],
                        [4280, 4100],
                        [4380, 4400]
                    ];

                    var line = d3.svg.line()
                        .tension(0)
                        .interpolate("cardinal-closed");

                    var svg = layer.datum(points)

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
                var layer  = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("class", "SvgOverlay").append("svg");

                 $scope.route = new Route(layer);
            }

            $scope.overlay.draw = function() {
                var pos = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(34.397, 150.644));
                $scope.route.addLine(pos.x+4000, pos.y+4000);


            };

            $scope.overlay.setMap($scope.dcumapping);

        }
    }

});