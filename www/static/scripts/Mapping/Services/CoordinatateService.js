Application.Services.factory('DayService', function($resource) {
        return $resource('day:id.json', {id: '@id'});
});
