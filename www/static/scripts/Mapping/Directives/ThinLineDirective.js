Application.Directives.directive('thinarrow', function ($state, $stateParams, $filter, $location, $q) {

    var styles = [{
        stylers:[{ color: "#ffffff"}, {saturation: -75}, {lightness: -50}]
    }
    ];

    return {
        restrict: 'A',

        link : function($scope) {

            console.log($scope);

            $scope.data = [
                {x : 0, y: 0, geo : {longitude : 0,  latitude : 11},    name : "Place 1"},
                {x : 0, y: 0, geo : {longitude : 20, latitude : 21},    name : "Place 2"},
                {x : 0, y: 0, geo : {longitude : 56, latitude : -21},   name : "Place 3"},
                {x : 0, y: 0, geo : {longitude : 56, latitude : -31},   name : "Place 5"},
                {x : 0, y: 0, geo : {longitude : 46, latitude : -34},   name : "Place 4"}

            ];

            function Route(layer) {

                function transition(path) {
                    $scope.path = path;
                    path.transition().duration(20000).attrTween("stroke-dasharray", tweenDash).each("end", function() {
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
                    layer.append("circle").style("stroke", "#000")

                    layer
                        .selectAll('.marker')
                        .data($scope.data)
                        .enter()
                        .append('circle')
                        .attr("stroke", "black")
                        .attr("fill", "white")
                        .attr("stroke-width","1.5px")
                        .attr("class", "marker")

                }
            }

            /*is this safe?*/
            $scope.$watch('overlay', function() {

                $scope.overlay.onAdd = function () {

                    $scope.layer = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("class", "SvgOverlay").append("svg");

                    var route = new Route($scope.layer);
                    route.addShapes();
                }


                $scope.overlay.draw = function () {
                    $scope.projection = this.getProjection();

                    /*update the x y for the new map layout, post zooming*/
                    $scope.data.forEach(function (search) {
                        search.x = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(search.geo.latitude, search.geo.longitude)).x;
                        search.y = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(search.geo.latitude, search.geo.longitude)).y;
                    });

                    $scope.layer
                        .selectAll("path.g-trail").datum($scope.data).attr("d", $scope.line)

                    $scope.layer
                        .selectAll('circle.marker')
                        .attr("cx", function (d, i) {
                            return d.x + 4000;
                        })
                        .attr("cy", function (d, i) {
                            return d.y + 4000;
                        })
                        .attr("r", function (d) {
                            return 4
                        })
                };

                $scope.overlay.setMap($scope.dcumapping);

            });

        }
    }

});