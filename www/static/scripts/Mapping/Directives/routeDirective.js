Application.Directives.directive('route', function ($rootScope, $state, $stateParams, $filter, $location, $q) {

    var styles = [{
        stylers:[{ color: "#ffffff"}, {saturation: -75}, {lightness: -50}]
    }
    ];

    return {
        restrict: 'A',

        link : function($scope) {

            var layer, data = [];

            $scope.index = 0;

            if (true) {

                var data = $scope.days;

                function Route() {

                    var that = this;
                    var _path;

                    function transition(path) {

                        _path = path;

                        _path.transition().duration(35000).attrTween("stroke-dasharray", tweenDash).each("end", function () {
                            path.attr('stroke-dasharray', null); //leaving the line as dash-array was causing glitches
                        });
                    }

                    //thanks to http://zevross.com/blog/2014/09/30/use-the-amazing-d3-library-to-animate-a-path-on-a-leaflet-map/
                    function tweenDash() {
                        return function (t) {
                            var l = _path.node().getTotalLength();
                            var interpolate = d3.interpolateString("0," + l, l + "," + l);
                            return interpolate(t);
                        }
                    }

                    this.addShapes = function () {
                        layer.append("path").attr('class', 'g-trail g-trail-usa').style("stroke", "#000").call(transition);
                    }
                }

                $scope.$on('draw', function () {

                    $scope.overlay.onAdd = function () {
                        layer = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("class", "SvgOverlay").append("svg");

                        var route = new Route();

                        route.addShapes();

                    }

                    var line = d3.svg.line()
                        .interpolate("cardinal")
                        .x(function (d) {
                            return d.x + 4000
                        })
                        .y(function (d) {
                            return d.y + 4000
                        });

                    $scope.overlay.draw = function () {

                        var projection = this.getProjection();


                        data.forEach(function(item) {

                            //console.log(item);

                            // update the x y for the new map layout, post zooming
                            item.forEach(function (search) {
                                search.x = projection.fromLatLngToDivPixel(new google.maps.LatLng(search.geo.latitude, search.geo.longitude)).x;
                                search.y = projection.fromLatLngToDivPixel(new google.maps.LatLng(search.geo.latitude, search.geo.longitude)).y;
                            });

                            layer.selectAll("path.g-trail").datum(item).attr("d", line)
                        });



                    };

                });

            }}

    }

});