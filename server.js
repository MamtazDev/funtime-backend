const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 4000;

const usersRoutes = require("./routes/usersRoutes");
const makeContactRoutes = require("./routes/makeContactRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const searchRoute = require("./routes/searchRoute");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const companionRoutes = require("./routes/companionRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const smsRoutes = require("./routes/smsRoutes");
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cors());
app.use(express.json());

connectDB();

// routes
app.use("/api/users", usersRoutes);
app.use("/api/makeContact", makeContactRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/search", searchRoute);
app.use("/api/conversation", conversationRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/companion", companionRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/sms", smsRoutes);

app.get("/", (req, res) => {
  res.send("Sever is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
