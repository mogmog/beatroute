Application.Directives.directive('photo', function ($state, $stateParams, $filter, $location, $q, $resource) {

    var styles = [{
        stylers:[{ color: "#ffffff"}, {saturation: -75}, {lightness: -50}]
    }
    ];

    return {
        restrict: 'A',

        link : function($scope) {

            var layer;

            var data  = [
                {x : 0, y: 0, geo : {longitude : 0,  latitude : 11},    name : "Place 1"},
                {x : 0, y: 0, geo : {longitude : 20, latitude : 21},    name : "Place 2"},
                {x : 0, y: 0, geo : {longitude : 56, latitude : -21},   name : "Place 3"},
                {x : 0, y: 0, geo : {longitude : 56, latitude : -31},   name : "Place 5"},
                {x : 0, y: 0, geo : {longitude : 46, latitude : -34},   name : "Place 4"}

            ];

            function Route() {

                this.addShapes = function() {
                    layer.append("circle").style("stroke", "red")

                    layer
                        .selectAll('.photomarker')
                        .data(data)
                        .enter()
                        .append('circle')
                        .attr("stroke", "red")
                        .attr("stroke-width","3px")
                        .attr("class", "photomarker")

                }
            }

            $scope.$on('draw', function() {

                $scope.overlay2.onAdd = function () {
                    console.log(this);
                    layer = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("class", "SvgOverlay").append("svg");

                    var route = new Route();
                    route.addShapes();
                }

                $scope.overlay2.draw = function () {

                    var minx = $scope.dcumapping.getBounds().getSouthWest().lng();
                    var maxx = $scope.dcumapping.getBounds().getNorthEast().lng();

                    var miny = $scope.dcumapping.getBounds().getSouthWest().lat();
                    var maxy = $scope.dcumapping.getBounds().getNorthEast().lat();


                    var Panario = $resource("http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20&minx=" + minx + "&miny=" + miny + "&maxx=" + maxx+ "&maxy=" + maxy + "&size=thumbnail&mapfilter=true", { callback: "JSON_CALLBACK" },{ get: { method: "JSONP" }});

                    $scope.$parent.picturesOnMap = Panario.get();

                    console.log($scope.$parent.picturesOnMap);


                    var projection = this.getProjection();

                   // update the x y for the new map layout, post zooming
                    data.forEach(function (search) {
                        search.x = projection.fromLatLngToDivPixel(new google.maps.LatLng(search.geo.latitude, search.geo.longitude - 10)).x;
                        search.y = projection.fromLatLngToDivPixel(new google.maps.LatLng(search.geo.latitude, search.geo.longitude- 25)).y;
                    });

                    layer
                        .selectAll('circle.photomarker')
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

            });

        }
    }

});