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
        .when('/stats/:query',{
            templateUrl: 'js/templates/stats.template.html',
            controller: 'StatsController as stat'
        })
        .otherwise({ reditrectTo : '/' });
}

angular
    .module('app.routes', ['ngRoute'])
    .config(router);



