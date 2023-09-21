const twilio = require("twilio");
const TWILIO_SID = "ACdb46baa1b3ba117b7b79479bdbf072e0";
const TWILIO_AUTH_TOKEN = "0ee320471d7b08ada5637148f3a97c2d";

const client = new twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);


 const twilioSMSSend = async({number,message})=>{
    await client.messages
    .create({
      body: message,
      from: "+12568297845",
      to: number, 
    })
    .then(() => {
        return true
      })
}

module.exports= {
    twilioSMSSend
}