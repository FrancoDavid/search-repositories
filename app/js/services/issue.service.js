'use strict';

angular
    .module('app-search-repo')
    .service('IssueService', ['$http', function($http) {
        return {
            getIssues: (repo) => {
                return $http({
                  method: 'GET',
                  url: 'https://api.github.com/search/issues?q='+repo
                })
                .then((result) => result)
                .catch((error) => window.alert('Error de conexión:  '+error.data.message));
          },
        };
    }]);