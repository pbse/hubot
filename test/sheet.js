const Helper = require('hubot-test-helper')
const expect = require('chai').expect;
const co = require('co');

const helper = new Helper('../scripts/sheets.js');

describe('hubot response', () => {
  beforeEach(() => {
    this.room = helper.createRoom({httpd: false});
  });

  context('user sends a read sheet message', () => {
    beforeEach(() => {
      return co(function*() {
        yield this.room.user.say('user1', 'read sheet');
      }.bind(this));
    });

    // response
    it('expects a response from hubot', () => {
      expect(this.room.messages).to.eql([
        ['user1', 'read sheet'],
        ['hubot', 'Ok, Starting to query google sheet. Will report for any change.']
      ]);
    });
  });
});


