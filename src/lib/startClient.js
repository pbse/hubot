const _ = require('lodash');
const {google} = require('googleapis');
const {createJSON, findDifference} = require("../util/util");
const {logger} = require("../util/logger");
const SHEET_VERSION = 'v4';
const sheetId = process.env.SHEET_ID;
const sheetRangeName = process.env.SHEET_RANGENAME;

const startClient = ({client, robot, res, auth}) => {
  const sheets = google.sheets({
    version: SHEET_VERSION,
    auth
  });

  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: sheetRangeName,
    }, (err, {data}) => {
      if (err) {
        logger.error(`The API Returned error with error - ${err}`);
        reject('The API returned an error');
      }
      const rows = data.values;
      if (rows.length) {
        resolve(createJSON(rows));
      } else {
        logger.error( `No data found. ${rows}`);
        reject('No data found.');
      }
    });
  })
    .then(data => {
      const oldData = robot.brain.get("sheetData") || {};
      if (_.isEmpty(oldData)) {
        robot.brain.set("sheetData", data);
        client.query("UPDATE hdata SET storage = $1 where id = '1'", [data]);
        res.send("Got this data from Google Sheets");
        res.send(JSON.stringify(data));
      } else {
        const diff = findDifference(oldData, data);
        if (diff) {
          logger.debug(`Found an update, sending it to Slack & Updating DB`);
          client.query("UPDATE hdata SET storage = $1 where id = '1'", [data]);
          robot.brain.set("sheetData", data);
          res.send(JSON.stringify(diff));
        }
      }
    })
};

module.exports.startClient = startClient;
