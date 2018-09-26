/**
 * Test suite for GithubEventRanker
 *  tests ranking function with static data
 *  tests the entire module 
 */

const assert = require('assert');

const GithubEventRanker = require('../GithubEventRanker.js');
const ranker = new GithubEventRanker();

describe('test rankEvents() with static data', function() {
    
    it('2 PushEvents and 1 PullRequestReviewCommentEvents returns 3.67', function() {
      assert.equal(ranker.rankEvents(testData), 3.67);
    });
    
    it('empy array returns 0', function() {
      assert.equal(ranker.rankEvents([]), 0);
    });
    
});

describe('test rankUser()', function() {
    
    it('harymitchell ranks between 0 and 4', function() {
      ranker.rankUser('harymitchell').then(rank => {
          assert(4 >= rank >= 0);
      });
    });
    
});


const testData = [
    {
    "id": "8321521969",
    "type": "PushEvent",
    "actor": {
        }
    },
    {
    "id": "8321521969",
    "type": "PushEvent",
    "actor": {
        }
    },
    {
    "id": "8321521969",
    "type": "PullRequestReviewCommentEvent",
    "actor": {
        }
    }
];