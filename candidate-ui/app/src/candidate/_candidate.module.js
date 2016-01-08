(function(){
    'use strict';

    angular
        .module('app.candidate', [])
        .config([
            '$stateProvider',
            DashboardConfig
        ]);

    function DashboardConfig($stateProvider) {

        $stateProvider.state('app.candidate',{
            url : '/candidate',
            views : {
                'main@app' : {
                    templateUrl : 'src/candidate/candidates.html',
                    controller : 'CandidatesController as ctrl'
                }
            },
            data: {

            }
        });
    }

})();