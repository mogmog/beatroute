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

            $scope.data = [
                {x : 0, y: 0, top_left : {longitude : 0, latitude : 11}},
                {x : 0, y: 0, top_left : {longitude : 20, latitude : 21}},
                {x : 0, y: 0, top_left : {longitude : 56, latitude : -21}}
            ];


            function Route(layer) {

                $scope.line = d3.svg.line()
                    .tension(0)
                    .interpolate("basis")
                    .x(function(d) {return d.x + 4000})
                    .y(function(d) {return d.y + 4000});

                this.addShapes = function() {

                    var svg = layer
                        .append("path")
                        .style("stroke", "#000")
                        .call(transition);
                }
            }

            $scope.overlay.onAdd = function() {

                $scope.layer  = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("class", "SvgOverlay").append("svg");

                var route = new Route($scope.layer);
                route.addShapes();
            }

            function transition(path) {
            $scope.path = path;
                path.transition().duration(27000).attrTween("stroke-dasharray", tweenDash).each("end", function() {
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

            $scope.overlay.draw = function() {
                $scope.projection = this.getProjection();

                /*update the x y for the new map layout, post zooming*/
                $scope.data.forEach(function(search){
                    search.x = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(search.top_left.latitude, search.top_left.longitude)).x;
                    search.y = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(search.top_left.latitude, search.top_left.longitude)).y;
                });

                d3.selectAll("path").datum($scope.data).attr("d", $scope.line)




            };

            $scope.overlay.setMap($scope.dcumapping);

        }
    }

});