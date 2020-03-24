const {google} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    "142781045009-r0d060olfaorahendbu0cshcdr8jgmho.apps.googleusercontent.com",
    "tkGDfnJBVxFNruCmtqDVZQT2",
    "https://area.pinteed.com/getAuth/redirectUrlGmail"
);

module.exports = oauth2Client;