Application.Directives.directive('marker', function ($state, $stateParams, $filter, $location, $q, $resource) {

    var styles = [{
        stylers:[{ color: "#ffffff"}, {saturation: -75}, {lightness: -50}]
    }
    ];

    return {
        restrict: 'A',

        link : function($scope) {

            var layer;

            var data = $scope.coordinates.features[0].geometry.coordinates.map(function(coordinate) {
                return  {x : 0, y: 0, geo : {longitude : coordinate[0],  latitude : coordinate[1]},    name : "Place 1"}
            });

            console.log(data);

            $scope.$on('draw', function() {

                $scope.overlay3.onAdd = function () {
                    layer = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("class", "SvgOverlay").append("svg");
                }

                $scope.update = function () {


                    layer
                        .selectAll('.marker')
                        .data(data)
                        .enter()
                        .append('circle')
                        .attr("stroke", "red")
                        .attr("stroke-width","3px")
                        .attr("class", "marker")

                    // update the x y for the new map layout, post zooming
                    data.forEach(function (search) {
                        search.x = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(search.geo.latitude, search.geo.longitude )).x;
                        search.y = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(search.geo.latitude, search.geo.longitude )).y;
                    });



                    layer.selectAll('circle.marker')
                        .attr("stroke", "red")
                        .attr("cx", function (d, i) {
                            return d.x + 4000;
                        })
                        .attr("cy", function (d, i) {
                            return d.y + 4000;
                        })
                        .attr("r", function (d) {
                            return 10
                        })
                };


                $scope.overlay3.draw = function() {
                    $scope.projection = this.getProjection();
                    $scope.update();

                };

            });

        }
    }

});