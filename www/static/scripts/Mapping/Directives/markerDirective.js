Application.Directives.directive('marker', function ($state, $stateParams, $filter, $location, $q, $resource) {

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

                    layer.on('click', function() {
                        var whereClicked = new google.maps.Point(d3.mouse(this)[0]-4000, d3.mouse(this)[1] - 4000);

                        console.log(whereClicked);
                        var latLng       = $scope.projection.fromDivPixelToLatLng(whereClicked);

                        data.push({ name : 'sdfsdsfd', x : whereClicked.x, y : whereClicked.y, geo : {longitude : latLng.lng(), latitude: latLng.lat()}});

                        d3.event.preventDefault(); //do not show menu
                        $scope.update();
                    })

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