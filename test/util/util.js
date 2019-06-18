const expect = require('chai').expect;
const {findDifference, createJSON} = require("../../src/util/util");

describe('Util Tests', () => {

  context('Find Difference', () => {
    before(() => {});

    it('expects a changed response', () => {
      let oldData = {"a": "b"};
      let newData = {"a": "c"};
      const res = findDifference(oldData, newData)
      expect(res[0]).to.eql('The Path a Was Updated. Old Value - b, New Value -  c');
    });

    it('expects a deleted response', () => {
      let oldData = {"a": "b"};
      let newData = {"b": "d"};
      const res = findDifference(oldData, newData);
      expect(res.length).to.eql(2);
      expect(res[0]).to.eql('The Path a was deleted - Old Value b');
      expect(res[1]).to.eql('The Path b was added - new Value d');
    });
  });

  context('createJSON', () => {
    before(() => {});

    it('expects a JSON from Array of Array', () => {
      let data = [['A','B'], [1,2], [2,3]];
      const res = createJSON(data);
      expect(res).to.be.an('object');
      expect(res.data[0]['A']).to.eql(1);
      expect(res.data[0]['B']).to.eql(2);
    });
  });

});
