/* http://docs.angularjs.org/#!angular.service */

angular.service('allQuestions', function($resource) {
    return $resource('/question/manageqn', {}, {
        query: {method: 'GET', params: {phoneId: 'phones'}, isArray: true}
    });
});