/**
 * 
 *  GithubEventRanker
 * 
    For a given username, pull down the data from Github API user events endpoint 
    and perform a weighted average of events. Here are the weights:
    
    PushEvent = 4, PullRequestReviewCommentEvent = 3, ReleaseEvent = 2, and everything else is 1.
    
    So if there are 2 PushEvents and 1 PullRequestReviewCommentEvents and nothing else then the output should be:
    (4*2 + 3*1) / (2 + 1) = 3.67 (rounded to 2 decimal places)
    
    API Usage:
        const ranker = new GithubEventRanker();
        ranker.rankUser('harymitchell').then(res => console.log(res));
    
    CLI Usage:
        > node GithubEventRanker.js username=harymitchell
    
 * 
 */
const GithubEventRanker = function(){
    const api = require('./GithubAPI.js');
    
    this.rankEvents = function (events){
        if (events.length === 0){
            return 0;
        }
        
        var rank = 0;
        
        events.forEach(event => {
            
            switch(event.type) {
            
                case 'PushEvent':
                    rank += 4;
                    break;
                case 'PullRequestReviewCommentEvent':
                    rank += 3;
                    break;
                case 'ReleaseEvent':
                    rank += 2;
                    break;
                default:
                    rank += 1;
                    break;
            }
             
        });
        
        return Math.round(rank / events.length*100)/100;
    };
    
    this.rankUser = function(username){
        const _this = this;
        return api.getUserEvents(username)
            .then(res => {
                return _this.rankEvents(res);
            });
                
    };
    
};

module.exports = GithubEventRanker;

if(module === require.main){
    
    const args = require("args-parser")(process.argv);
    if(args.h || args.help || !args.username) {
        console.log('-h, --help              Print this help message.');
        console.log('--username              Github username.');
        process.exit(0);
    } else {
        const ranker = new GithubEventRanker();
        ranker.rankUser(args.username).then(res => console.log(`${args.username} rank is ${res}`));
    }
}
    