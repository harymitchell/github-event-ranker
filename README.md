# GithubEventRanker
Usage of Github's User Events API using node.js.

## Requirements
For a given username, pull down the data from Github API user events endpoint and perform a weighted average of events. 

Here are the weights:
- PushEvent = 4
- PullRequestReviewCommentEvent = 3
- ReleaseEvent = 2
- everything else is 1

For example, if there are 2 PushEvents and 1 PullRequestReviewCommentEvents and nothing else then the output should be: 
- (4*2 + 3*1) / (2 + 1) = 3.67 (rounded to 2 decimal places)

## Install
```
git clone https://github.com/harymitchell/github-event-ranker.git
cd github-event-ranker
npm install
```

## CLI Example Usage:
```
node GithubEventRanker.js username=harymitchell
```

## API Usage:
```javascript
const GithubEventRanker = require('../GithubEventRanker.js');
const ranker = new GithubEventRanker();
ranker.rankUser('harymitchell').then(res => console.log(res));
```

### GithubAPI.js
- Module provides interface with the Github Public API http://api.github.com/

### GithubEventRanker.js
- Utilizes the GithubAPI module to rank the user provided in the --username= arg

## Test Suite
- Using the Mocha test framework https://mochajs.org/
- Located in the */tests* directory

### Running Tests
```
npm test
```

### GithubEventRanker Test Suite 
- tests ranking function with static data
- tests the entire module 

### GithubAPI Test Suite  
- tests retrieveing user events from Github API

