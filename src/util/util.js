const _ = require('lodash');
const diff = require('deep-diff').diff;

const findDifference = (oldData, newData) => {
  if(_.isEqual(oldData, newData)) {
    return false;
  }
  return diff(oldData, newData);
};

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
