# Hubot Google Sheet Reader

This builds a hubot that connects into a Google sheet every 5 minutes and detects changes to syncs to a Postgres instance. Once the sync is complete it messages on Slack any updates that were made.

### Requirements
    
    node > 8
    yarn
    postgres
    
### PreTables

    CREATE TABLE hdata ( id CHARACTER VARYING(1024) NOT NULL, storage JSON)
    INSERT INTO hdata VALUES(1, NULL)
     
### Running Locally

    clone the repo
    yarn
    copy .env.example to .env
    put environement variables
    put slack token in start.sh
    ./start.sh

Test:

    yarn test

Slack Message

    read sheet

### Consideration

The Sheet ID is taken in Env file, Ideally it should be given as part of input from slack message.

### Nice to haves

- More Tests
- Use of TypeScript

### Demo

![DEMO](https://media.giphy.com/media/XEI7jPqx8rkndA4yfF/giphy.gif)
