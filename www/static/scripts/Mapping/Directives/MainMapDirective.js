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
                {x : 0, y: 0, geo : {longitude : 0,  latitude : 11},    name : "Place 1"},
                {x : 0, y: 0, geo : {longitude : 20, latitude : 21},    name : "Place 2"},
                {x : 0, y: 0, geo : {longitude : 56, latitude : -21},   name : "Place 3"},
                {x : 0, y: 0, geo : {longitude : 56, latitude : -34},   name : "Place 4"},
                {x : 0, y: 0, geo : {longitude : 56, latitude : -31},   name : "Place 5"}
            ];

            function Route(layer) {

                $scope.line = d3.svg.line()
                    .tension(0)
                    // .interpolate("basis")
                    .x(function(d) {return d.x + 4000})
                    .y(function(d) {return d.y + 4000});

                this.addShapes = function() {
                    layer.append("path").style("stroke", "#000").call(transition);
                    layer.append("circle").style("stroke", "#000")

                    layer
                        .selectAll('.rectangle')
                        .data($scope.data)
                        .enter()
                        .append('circle')
                        .attr("stroke", "black")
                        .attr("stroke-width","10px")
                        .attr("class", "rectangle")

                }
            }

            $scope.overlay.onAdd = function() {

                $scope.layer  = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("class", "SvgOverlay").append("svg");

                var route = new Route($scope.layer);
                route.addShapes();
            }

            function transition(path) {
                $scope.path = path;
                path.transition().duration(30000).attrTween("stroke-dasharray", tweenDash).each("end", function() {
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
                    search.x = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(search.geo.latitude, search.geo.longitude)).x;
                    search.y = $scope.projection.fromLatLngToDivPixel(new google.maps.LatLng(search.geo.latitude, search.geo.longitude)).y;
                });

                $scope.layer
                      .selectAll("path").datum($scope.data).attr("d", $scope.line)

                $scope.layer
                    .selectAll('circle.rectangle')
                    .attr("cx",      function(d, i) { return d.x + 4000; } )
                    .attr("cy",      function(d, i) { return d.y + 4000; } )
                    .attr("r",       function(d) {return 5} )
            };

            $scope.overlay.setMap($scope.dcumapping);

        }
    }

});