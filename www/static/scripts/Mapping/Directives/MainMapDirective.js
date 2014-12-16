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

                this.addLine = function (pos) {
                    var points = pos.map(function(pos) {return [pos.x + 4000, pos.y + 4000]});

                    console.log(points);
                    
                    var line = d3.svg.line()
                        .tension(0)
                        .interpolate("cardinal-closed");

                    var svg = layer.datum(points)

                    svg.selectAll('path').remove();

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
                          //  .each("end", function() { d3.select(this).call(transition); });
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
                var pos1 = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(34.397, 150.644));
                var pos2 = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(34.797, 150.944));
                var pos3 = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(33.797, 151.944));


                $scope.route.addLine([pos1, pos2, pos3]);


            };

            $scope.overlay.setMap($scope.dcumapping);

        }
    }

});