const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;

const usersRoutes = require("./routes/usersRoutes");
const companionRoutes = require("./routes/companionRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const smsRoutes = require("./routes/smsRoutes");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// Enable CORS for all routes
app.use(
  cors({
    origin: "https://fun-time-react.vercel.app", // Replace with your frontend's domain
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

connectDB();

// routes
app.use("/api/users", usersRoutes);
app.use("/api/companion", companionRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/sms", smsRoutes);

app.get("/", (req, res) => {
  res.send("Sever is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
