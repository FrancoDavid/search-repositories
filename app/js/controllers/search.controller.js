'use strict';
angular
    .module('app-search-repo')
    .controller('SearchController', ['$scope', 'SearchService', function($scope, SearchService) {
        $scope.searchValue = '';
        $scope.repositories = [];

        $scope.searchingRepo = () => {
            console.log('search..', $scope.searchValue);
            SearchService.getRepositories($scope.searchValue)
                .then((response) => {
                    $scope.repositories = response.data.items;
                    console.log($scope.repositories);

                }).catch((error) => {
                    window.alert('Upps ha ocurrido un problema: '+error.data.message);
                });
        };
        
    }]);