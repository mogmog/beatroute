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

                var line = d3.svg.line()
                    .tension(0) // Catmull–Rom
                    .interpolate("cardinal-closed");



                this.addLine = function () {

                    $scope.drawing = true;

                    var points = [
                        [$scope.data[0].x + 4000, $scope.data[0].y + 4000],
                        [$scope.data[1].x + 4000, $scope.data[1].y + 4000],
                        [$scope.data[2].x + 4000, $scope.data[2].y + 4000],
                        [$scope.data[3].x + 4000, $scope.data[3].y + 4000],
                        [$scope.data[4].x + 4000, $scope.data[4].y + 4000],
                        [$scope.data[5].x + 4000, $scope.data[5].y + 4000]
                    ];



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
                            .duration(27500)
                            .attrTween("stroke-dasharray", tweenDash)
                            .each("end", function() {
                            $scope.drawing = false;
                            });
                    }

                    function tweenDash() {
                        var l = this.getTotalLength(),
                            i = d3.interpolateString("0," + l, l + "," + l);
                       // console.log("0," + l, l + "," + l);

                        return function(t) {

                           // console.log(t);

                            return i(t); };
                    }


                }
            }

            $scope.overlay.onAdd = function() {
                $scope.projection = this.getProjection();
                $scope.layer  = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("class", "SvgOverlay").append("svg");

                $scope.route = new Route($scope.layer);
                $scope.drawing = false;
            }

            $scope.overlay.draw = function() {

               // $scope.projection = this.getProjection();

               // $scope.layer.select('path').remove();

                var pos1 = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(12.397, 150.844));
                var pos2 = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(45.797, 161.444));
                var pos3 = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(55.797, 152.244));
                var pos4 = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(11.397, 155.844));
                var pos5 = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(41.797, 165.444));
                var pos6 = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(57.797, 155.244));


                $scope.data = [pos1, pos2, pos3, pos4, pos5, pos6];

                if (!$scope.drawing)
                    $scope.route.addLine();
            };

            $scope.overlay.setMap($scope.dcumapping);

        }
    }

});