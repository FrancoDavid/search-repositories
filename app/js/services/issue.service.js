'use strict';

angular
    .module('app-search-repo')
    .service('IssueService', ['$http', function($http) {
        return {
            getIssues: function(repo){
                console.log('get', repo);
                return $http({
                  method: 'GET',
                  url: 'https://api.github.com/search/issues?q='+repo
                }).then(function(result){
                  console.log(result);
                    // Si el resultado es erróneo
                  if(result.data.Resultado == '-1'){
                    console.log('fail');
                  }
                  return result;
                });
          },
        };
    }]);