/**
 * Test suite for GithubAPI
 */

const assert = require('assert');

const api = require('../GithubAPI.js');

describe('test getUserEvents()', function() {
    
    it('harymitchell has events', function() {
        
        api.getUserEvents('harymitchell')
            .then(res => {
                assert(res.length > 0);
            });
        
    });
    
});

