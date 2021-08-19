'use strict';

function router($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'js/templates/search.template.html',
            controller: 'SearchController as search'
        })
        .when('/issues/:query',{
            templateUrl: 'js/templates/issue.template.html',
            controller: 'IssuesController as issue'
        })
        .otherwise({ reditrectTo : '/' });
}

angular
    .module('app.routes', ['ngRoute'])
    .config(router);



