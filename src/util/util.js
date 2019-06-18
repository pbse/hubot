const _ = require('lodash');
const diff = require('deep-diff').diff;
const util = require('util');

/*
  Find Difference between two objects
 */
const findDifference = (oldData, newData) => {
  if(_.isEqual(oldData, newData)) {
    return false;
  }
  const difference = diff(oldData, newData);
  const out = [];
  //console.log(difference);
  for (let diff of difference ) {
    switch(diff.kind) {
      case 'E' :
        out.push(`The Path ${diff.path} Was Updated. Old Value - ${diff.lhs}, New Value -  ${diff.rhs}`);
        break;
      case 'A' :
        out.push(`The Path Array ${diff.path} was Changed with value ${util.inspect(diff.item)}`)
        break;
      case 'D' :
        out.push(`The Path ${diff.path} was deleted - Old Value ${diff.lhs || diff.rhs}`)
        break;
      case 'N' :
        out.push(`The Path ${diff.path} was added - new Value ${diff.lhs || diff.rhs}`)
        break;
      default :
        break;
    }
  };
  return out;
};

/*
  Convert Array of Arrays to JSON
 */
const createJSON = (data) => {
  const obj = {};
  obj.data = [];
  let headLen = data[0].length;
  for (let i=1;i<data.length;i++) {
    const temp = {};
    for (let j=0;j<headLen;j++) {
      temp[data[0][j]] = data[i][j];
    }
    obj.data.push(temp);
  }
  return obj;
};

module.exports.findDifference = findDifference;
module.exports.createJSON = createJSON;
