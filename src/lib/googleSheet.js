const {google} = require('googleapis');
const readline = require('readline');
const fs = require('fs');
const TOKEN_PATH = process.env.TOKEN_PATH || 'token.json';
const SCOPES = process.env.SCOPES || ['https://www.googleapis.com/auth/spreadsheets.readonly'];

class GoogleSheet {

  constructor({client_id, client_secret, redirect_uri}) {
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.redirect_uri = redirect_uri;
    this.oAuth2Client = new google.auth.OAuth2(this.client_id, this.client_secret, this.redirect_uri);
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  getNewToken () {
    const authUrl = this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return new Promise((resolve, reject) => {
      rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        this.oAuth2Client.getToken(code, (err, token) => {
          if (err) reject(`Error while trying to retrieve access token, ${err}`);
          this.oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
          });
          resolve(true);
        });
      });
    });
  }

  authorize() {
    return new Promise((resolve, _reject) => {
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
          resolve(this.getNewToken(oAuth2Client));
        }
        else {
          this.oAuth2Client.setCredentials(JSON.parse(token));
          resolve(true);
        }
      });
    });
  }
}

module.exports.GoogleSheet = GoogleSheet;
