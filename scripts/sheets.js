require('dotenv').config();
const {GoogleSheet} = require("../src/lib/googleSheet");
const {connectToDB} = require("../src/lib/db");
const {startClient} = require("../src/lib/startClient");
const {logger} = require("../src/util/logger");
const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
const redirect_uri = process.env.GOOGLE_REDIRECT_URI;

// Use SetTimeOut and Not SetInterval
// Because this involves IO. Repeat should only happen on success.
const startSchedule = ({client, robot, res, auth}) => {
  setTimeout(() => {
    Promise.resolve()
      .then(() => startClient({client, robot, res, auth}))
      .then(() => startSchedule({client, robot, res, auth}))
      .catch(err => logger.debug(err));
  }, 300000)
};

module.exports = function(robot) {

  if (!client_id || !client_secret || !redirect_uri) {
    throw new Error("Sheet Creds are Missing, Aborting")
  }
  // DB Instance
  const client = connectToDB();
  // Google Sheet Instance
  const googleSheetClient = new GoogleSheet({client_id, client_secret, redirect_uri});

  // Listen to Read Sheet
  // Sheet ID should be taken from here Ideally,
  // For now, its taken from .env file
  robot.hear(/read sheet/i, (res) => {
    res.send("Ok, Starting to query google sheet. Will report for any change.");
    googleSheetClient.authorize()
      .then(_boolData => startClient({client, robot, res, auth: googleSheetClient.oAuth2Client}))
      .then(()        => startSchedule({client, robot, res, auth: googleSheetClient.oAuth2Client}))
      .catch(err      => logger.debug(err));
  });
};
