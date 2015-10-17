Application.Services.factory('CoordinateService', function($resource) {
        return $resource('day1.json');
});