/**
 * GithubAPI
 * 
 * This module provides interface with the Github Public API http://api.github.com/
 * 
 * Usage:
 *  api = require('./githubAPI.js');
 *  api.getUserEvents(username)
        .then(res => {
            console.log(res)
        });
 * 
 */
const GithubAPI = function(){
    const url = require('url');
    const rp = require('request-promise');
    const base_url = 'http://api.github.com/';
    
    /**
     * Returns a promise to List user events for given username
     * 
     * GET /users/:username/events
     * 
     * Docs:  https://developer.github.com/v3/activity/events/#list-events-performed-by-a-user
     * 
     */
    this.getUserEvents = function(username){
        return submitGetRequest(`/users/${username}/events`);
    };
    
    /**
     * Helper function to submit GET request
     */
    const submitGetRequest = function(route){
        
        const options = {
            uri: url.resolve(base_url, route),
            json: true, 
            headers: {
                'User-Agent': 'Event-Ranker'
            },
        };
        
        return rp(options)
            .catch(function (err) {
                console.error(err);
                return err;
            });
    };
};

module.exports = new GithubAPI();