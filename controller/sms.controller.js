const twilio = require("twilio");

const TWILIO_SID = "AC40c117c8a0962bc29f69c92ea3869ab7";
const TWILIO_AUTH_TOKEN = "217a883a530148145da3219ad38ed767";

const client = new twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

const Receiversms = async (req, res) => {
  const receivedMessage = req.body.Body;

  console.log("receivedMessage", receivedMessage);

  // Check if receivedMessage is defined and is a string
  if (typeof receivedMessage === "string") {
    // Convert to lowercase and then validate the response (Yes or No)
    const lowerCaseMessage = receivedMessage.toLowerCase();

    if (lowerCaseMessage === "yes") {
      console.log("Yes press", receivedMessage);

      // client.messages.create({
      //   body: 'Your partner is agreed ',
      //   from: "+12563845752",
      //   to: '+8801859561002',
      // })
      // .then(() => {
      //   res.send('our partner is agreed');
      // })
      // .catch((error) => {
      //   console.error(error);
      //   res.status(500).send('Error sending initial ');
      // });

      // Handle "Yes" response
    } else if (lowerCaseMessage === 'no') {
      console.log("No press", receivedMessage)

      // client.messages.create({
      //   body: 'Your partner is not agreed ',
      //   from: "+12563845752",
      //   to: '+8801859561002',
      // })
      // .then(() => {
      //   res.send('our partner is agreed.');
      // })
      // .catch((error) => {
      //   console.error(error);
      //   res.status(500).send('Error sending initial message.');
      // });

      client.messages
        .create({
          body: "Your partner is not agreed ",
          from: "+12563845752",
          to: "+8801859561002",
        })
        .then(() => {
          res.send("our partner is agreed.");
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send("Error sending initial message.");
        });

      // Handle "No" response
    }
  }

  // res.send('Response received.');
};

const senderMessage = async (req, res) => {
  client.messages.create({
    body: 'Are you able to join with us?',
    from: "+12563845752",
    to: "+8801859561002", //filtered data
  })
  .then(() => {
    res.send('Initial message sent.');
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error sending initial message.');
  });
  
};



const ConfirmationMessage = async (req, res) => {
  client.messages
    .create({
      body: "Are you able to join with us?",
      from: "+12563845752",
      to: "+8801859561002",
    })
    .then(() => {
      res.send("Initial message sent.");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error sending initial message.");
    });
};

module.exports = {
  Receiversms,
  senderMessage,
  ConfirmationMessage,
};
