'use strict';
angular
    .module('app-search-repo')
    .directive('gridRepo', function() {
        return {
            restrict: 'E',
            templateUrl: 'js/templates/gridrepo.template.html',
            scope: {
                repo: '=repo'
            }
        };
    });
