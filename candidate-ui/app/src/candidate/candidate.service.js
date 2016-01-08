(function(){
    'use strict';

    angular
        .module('app.candidate')
        .service('CandidateService', [
            '$http',
            CandidateService
        ]);


    function CandidateService($http) {
        var self = this;

        this.get = function () {
            return $http.get('/candidate');
        }

        this.put = function (id, candidate) {
            return $http.put('/candidate/' + id, candidate);
        }

        this.post = function (candidate) {
            return $http.post('/candidate', candidate);
        }

        this.deleteSelected = function (listId){
            return $http.post('/candidate/delete', listId);
        }
    }

})();