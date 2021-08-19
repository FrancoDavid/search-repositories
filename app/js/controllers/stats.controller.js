'use strict';
angular
    .module('app-search-repo')
    .controller('StatsController', ['$scope', '$routeParams', 'SearchService', function($scope, $routeParams, SearchService) {
        
        console.log('stats controller...');
        $scope.repository = $routeParams.query;
        $scope.dataStats = [];
        $scope.labelStats = [];

        SearchService.getRepositories($scope.repository)
            .then((response) => {
                console.log(response);

                $scope.dataStats = response.data.items.map((item) => item.forks);
                $scope.labelStats = response.data.items.map((item) => item.name);

                console.log($scope.dataStats);
                console.log($scope.labelStats);

            }).catch((error) => {
                window.alert('Upps ha ocurrido un problema: '+error.data.message);
            });

        
    }]);