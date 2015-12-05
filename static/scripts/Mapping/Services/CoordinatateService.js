Application.Services.factory('DayService', function($resource) {
        return $resource('static/day:id.json', {id: '@id'});
});
