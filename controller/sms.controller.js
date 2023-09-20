const twilio = require("twilio");
const Booking = require("../models/booking.model");
const Companion = require("../models/companion.model");

const TWILIO_SID = "ACdb46baa1b3ba117b7b79479bdbf072e0";
const TWILIO_AUTH_TOKEN = "0ee320471d7b08ada5637148f3a97c2d";

// const TWILIO_SID = "AC513894f19e7c95b99b0858c81eb2d9c3";
// const TWILIO_AUTH_TOKEN = "4c3008c9cb83ee686ecb6f2de9524a38";

const client = new twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

const Receiversms = async (req, res) => {
  const { message, companionNumber } = req.body;

  const companion = await Companion.findOne({ phone: companionNumber });
  console.log(companion?._id);
  const booking = await Booking.findOne({ bookedCompanion: companion?._id });
  console.log(booking);
  if (booking && message === "yes") {
    booking.status = "Confirmed";
    await booking.save();
    res.send("Companion agreed");
  } else if (booking && message === "no") {
    booking.status = "Rejected";
    await booking.save();
    res.send("Companion rejected");
  }
};

// const Receiversms = async (req, res) => {
//   const receivedMessage = req.body.Body;
//   const receivedNumber = req.body.From;

//   console.log("receivedMessage", receivedMessage);
//   console.log("receivedNumber", receivedNumber);

//   // Check if receivedMessage is defined and is a string
//   if (typeof receivedMessage === "string") {
//     // Convert to lowercase and then validate the response (Yes or No)
//     const lowerCaseMessage = receivedMessage.toLowerCase();

//     if (lowerCaseMessage === "yes") {
//       console.log("Yes press", receivedMessage);

//       // client.messages.create({
//       //   body: 'Your partner is agreed ',
//       //   from: "+12563845752",
//       //   to: '+8801859561002',
//       // })
//       // .then(() => {
//       //   res.send('our partner is agreed');
//       // })
//       // .catch((error) => {
//       //   console.error(error);
//       //   res.status(500).send('Error sending initial ');
//       // });

//       // Handle "Yes" response
//     } else if (lowerCaseMessage === "no") {
//       console.log("No press", receivedMessage);

//       // client.messages.create({
//       //   body: 'Your partner is not agreed ',
//       //   from: "+12563845752",
//       //   to: '+8801859561002',
//       // })
//       // .then(() => {
//       //   res.send('our partner is agreed.');
//       // })
//       // .catch((error) => {
//       //   console.error(error);
//       //   res.status(500).send('Error sending initial message.');
//       // });

//       client.messages
//         .create({
//           body: "Your partner is not agreed ",
//           from: "+12568297845",
//           to: "+8801859561002",
//         })
//         .then(() => {
//           res.send("our partner is agreed.");
//         })
//         .catch((error) => {
//           console.error(error);
//           res.status(500).send("Error sending initial message.");
//         });

//       // Handle "No" response
//     }
//   }

//   // res.send('Response received.');
// };

const senderMessage = async (req, res) => {
  const { userNumber, companionNumber } = req.body;
  // client.messages.create({
  //   body: "Are you able to join with us?",
  //   from: `${userNumber}`,
  //   to: `${companionNumber}`, //filtered data
  // });

  client.messages
    .create({
      body: "Are you able to join with us?",
      from: "+12568297845",
      to: "+8801700594282", //filtered data
    })
    .then(() => {
      res.send("Initial message sent.");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error sending initial message.");
    });
};

const ConfirmationMessage = async (req, res) => {
  // const {}=
  client.messages
    .create({
      body: "Are you able to join with us?",
      from: "+12563845752",
      to: "+8801700594282",
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
