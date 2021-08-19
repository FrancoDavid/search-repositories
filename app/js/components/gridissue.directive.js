'use strict';
angular
    .module('app-search-repo')
    .directive('gridIssue', function() {
        return {
            restrict: 'E',
            templateUrl: 'js/templates/gridissue.template.html',
            scope: {
                issue: '=issue'
            }
        };
    });
