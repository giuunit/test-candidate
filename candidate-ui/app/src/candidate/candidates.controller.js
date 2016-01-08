(function(){
    'use strict';

    angular
        .module('app.candidate')
        .controller('CandidatesController', [
        	'CandidateService',
            CandidatesController
        ]);

    function CandidatesController(CandidateService) {
        var self = this;

        self.candidates = [];
        self.listId = [];

        CandidateService.get().then(function(response){
            self.candidates = response.data;
        });

        self.onchange = function(candidate) {
            CandidateService.put(candidate.id, candidate.enabled).then(function(response){
                //todo: see other scenarios
                if(response.status == 200){
                    alert('Successful update');

                    //as the status is successful we don't need to update the view
                }
            });
        }

        self.post = function(candidate){
            candidate.enabled = true;
            CandidateService.post(candidate).then(function(response){
                //todo: see other scenarios
                if(response.status == 200){
                    alert('Successful addition');

                    //we add the candidate to the view
                    self.candidates.push(response.data);
                }
            });
        }

        self.toggleSelection = function(id) {
            //list empty: we add the element to the list
            if(self.listId.length == 0)
                self.listId.push(id);
            //list doesn't contains the element: we add it
            else if(self.listId.indexOf(id) == -1)
                self.listId.push(id);
            //list contains the element: we remove it
            else 
                self.listId.splice(self.listId.indexOf(id),1);
        }

        self.deleteSelected = function() {

            //list empty: we do nothing
            if(self.listId.length == 0)
                return;

            CandidateService.deleteSelected(self.listId).then(function(response){
                if(response.status == 200) {
                    alert('Successful removal');

                    //we delete the elements in the model
                    //todo: an helper method like linq in .net would be very useful to compare 2 lists
                    for(var i=0;i<self.listId.length;i++) {
                        for(var j=0;j<self.candidates.length;j++){
                            if(self.candidates[j].id == self.listId[i]) {
                                self.candidates.splice(j,1);
                                break;
                            }
                        }
                    }

                    self.listId = [];
                }
            });
        }
    }

})();