'use strict';
angular
    .module('app-search-repo')
    .controller('StatsController', ['$scope', '$routeParams', 'SearchService','$location', function($scope, $routeParams, SearchService, $location) {
        
        console.log('stats controller...');
        $scope.repository = $routeParams.query;
        $scope.dataStats = [];
        $scope.labelStats = [];
        $scope.optionStats = {
            labels: {
                color: '#fffff'
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            }
        };

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
        
        $scope.goBack = () => {
            $location.url('/');
        };   
        
    }]);