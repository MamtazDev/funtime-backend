const twilio = require("twilio");
const Booking = require("../models/booking.model");
const Companion = require("../models/companion.model");
const { twilioSMSSend } = require("../utils/twiloSmsSend");

// const TWILIO_SID = "AC40c117c8a0962bc29f69c92ea3869ab7";
// const TWILIO_AUTH_TOKEN = "2489eb640e4efd40a9514ea23dea4219";

// paid credential
const TWILIO_SID = "AC513894f19e7c95b99b0858c81eb2d9c3";
const TWILIO_AUTH_TOKEN = "d9bc0f13a6535eded3e211c52c5be61d";

// const TWILIO_SID = "AC513894f19e7c95b99b0858c81eb2d9c3";
// const TWILIO_AUTH_TOKEN = "4c3008c9cb83ee686ecb6f2de9524a38";

const client = new twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

const Receiversms = async (req, res) => {
  const { message, companionNumber } = req.body;

  const receivedMessage = req.body.Body;
  const receivedNumber = req.body.From;

  console.log("From SMS service provider: ", receivedMessage, receivedNumber);

  // console.log("message, companionNumber", message, companionNumber);

  const companion = await Companion.findOne({ phone: companionNumber });
  // console.log(companion?._id);
  const booking = await Booking.findOne({ bookedCompanion: companion?._id });
  // console.log(booking);
  if (booking && message === "yes") {
    const userMessage = `Request for ${companion?.name} on ${booking?.date} ${booking?.clock} ${booking?.time} at ${booking?.userPlace} room:${booking?.roomNumber} is confirmed.`;
    const adminMessage = `${booking?.userName} & ${booking?.userPhoneNumber}, has booked for ${companion?.name} on ${booking?.date} ${booking?.clock} ${booking?.time} at ${booking?.userPlace} room:${booking?.roomNumber} is confirmed.`;
    booking.status = "Confirmed";
    await booking.save();

    await twilioSMSSend({ number: "+8801700594282", message: userMessage });
    await twilioSMSSend({ number: "+8801700594282", message: adminMessage });

    res.send("Companion agreed");
  } else if (booking && message === "no") {
    const userMessage = `Request for ${companion?.name} on ${booking?.date} ${booking?.clock} ${booking?.time} at ${booking?.userPlace} room:${booking?.roomNumber} is declined.`;
    const adminMessage = `${booking?.userName} & ${booking?.userPhoneNumber}, has booked for ${companion?.name} on ${booking?.date} ${booking?.clock} ${booking?.time} at ${booking?.userPlace} room:${booking?.roomNumber} is declined.`;
    booking.status = "Rejected";
    await booking.save();

    await twilioSMSSend({ number: "+8801700594282", message: userMessage });
    await twilioSMSSend({ number: "+8801700594282", message: adminMessage });

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
  const {
    userNumber,
    companionNumber,
    date,
    userName,
    companion,
    userPlace,
    roomNumber,
    specialRequests,
    clock,
    time,
  } = req.body;
  // client.messages.create({
  //   body: "Are you able to join with us?",
  //   from: `${userNumber}`,
  //   to: `${companionNumber}`, //filtered data
  // });

  try {
    const companionMessage = `${userName} would like to schedule you for ${date} ${clock} ${time}h at ${userPlace} room:${roomNumber}. Additional note: ${specialRequests} , reply, yes or no.`;
    const userMessage = `You’ve successfully requested for ${companion} on ${date} ${clock} ${time}h at ${userPlace} room:${roomNumber}. Please wait for confirmation.`;

    await twilioSMSSend({
      number: "+8801700594282",
      message: companionMessage,
    });
    await twilioSMSSend({ number: "+8801700594282", message: userMessage });

    res.send("Initial message sent.");
  } catch (error) {
    res.status(500).send("Error sending initial message.");
  }

  // client.messages
  //   .create({
  //     body: `${userName} would like to schedule you for ${date} ${clock} ${time}h at ${userPlace} room:${roomNumber}. Additional note: ${specialRequests} , reply, yes or no.`,
  //     from: "+12568297845",
  //     to: "+8801700594282", //filtered data
  //   })
  //   .then(() => {
  //     client.messages
  //       .create({
  //         body: `You’ve successfully requested for ${companion} on ${date} ${clock} ${time}h at ${userPlace} room:${roomNumber}. Please wait for confirmation.`,
  //         from: "+12568297845",
  //         to: "+8801700594282", //filtered data
  //       })
  //     res.send("Initial message sent.");
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     res.status(500).send("Error sending initial message.");
  //   });
};

const ConfirmationMessage = async (req, res) => {
  // const {}=
  client.messages
    .create({
      body: "Are you able to join with us?",
      from: "8801620665499",
      // from: "+12563845752",
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
