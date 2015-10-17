Application.Directives.directive('route', function ($state, $stateParams, $filter, $location, $q) {

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

            function Route() {

                function transition(path) {
                    $scope.path = path;
                    path.transition().duration(60000).attrTween("stroke-dasharray", tweenDash).each("end", function() {
                        path.attr('stroke-dasharray', null); //leaving the line as dash-array was causing glitches
                    });
                }

                //thanks to http://zevross.com/blog/2014/09/30/use-the-amazing-d3-library-to-animate-a-path-on-a-leaflet-map/
                function tweenDash() {
                    return function(t) {
                        var l = $scope.path.node().getTotalLength();
                        var interpolate = d3.interpolateString("0," + l, l + "," + l);
                        return interpolate(t);
                    }
                }

                $scope.line = d3.svg.line()
                    .interpolate("cardinal")
                    .x(function(d) {return d.x + 4000})
                    .y(function(d) {return d.y + 4000});

                this.addShapes = function() {
                    layer.append("path").attr('class', 'g-trail g-trail-usa').style("stroke", "#000").call(transition);
                    //layer.append("circle").style("stroke", "#000")

                    layer
                        .selectAll('.marker')
                        .data(data)
                        .enter()
                        .append('circle')
                        .attr("stroke", "black")
                        .attr("fill", "white")
                        .attr("stroke-width","1.5px")
                        .attr("class", "marker")

                }
            }

            $scope.$on('draw', function() {

                $scope.overlay.onAdd = function () {
                    console.log(this);
                    layer = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("class", "SvgOverlay").append("svg");

                    var route = new Route();
                    route.addShapes();
                }

                $scope.overlay.draw = function () {

                    var projection = this.getProjection();

                    // update the x y for the new map layout, post zooming
                    data.forEach(function (search) {
                        search.x = projection.fromLatLngToDivPixel(new google.maps.LatLng(search.geo.latitude, search.geo.longitude)).x;
                        search.y = projection.fromLatLngToDivPixel(new google.maps.LatLng(search.geo.latitude, search.geo.longitude)).y;
                    });

                    layer
                        .selectAll("path.g-trail").datum(data).attr("d", $scope.line)


                    //layer
                    //    .selectAll('circle.marker')
                    //    .attr("cx", function (d, i) {
                    //        return d.x + 4000;
                    //    })
                    //    .attr("cy", function (d, i) {
                    //        return d.y + 4000;
                    //    })
                    //    .attr("r", function (d) {
                    //        return 1
                    //    })
                };

            });

        }
    }

});