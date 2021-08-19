'use strict';
angular
    .module('app-search-repo')
    .controller('IssuesController', ['$scope', '$routeParams', 'IssueService', '$location', function($scope, $routeParams, IssueService, $location) {
        console.log('issues controller', $routeParams);
        $scope.repository = $routeParams.query;
        $scope.issues = [];

        IssueService.getIssues($scope.repository)
            .then((response) => {
                $scope.issues = response.data.items;
                console.log($scope.issues);
            })
            .catch((error) => {
                window.alert('Upss ha ocurrido algo inesperado: '+  error.data.message);
            });
        

        $scope.goBack = () => {
            $location.url('/');
        };   
    }]);