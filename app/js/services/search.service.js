'use strict';

angular
    .module('app-search-repo')
    .service('SearchService', ['$http', function($http) {
        return {
            getRepositories: (repo) => {
              return $http({
                method: 'GET',
                url: 'https://api.github.com/search/repositories?q='+repo
              })
              .then((result) => result)
              .catch((err) => window.alert('Error de conexión: '+err.data.message));
          },
        };
    }]);