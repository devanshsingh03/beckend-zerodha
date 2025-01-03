require("dotenv").config();
const { Login, Signup } = require("./AuthController");
const { userVerification } = require("./AuthMiddleware");
const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const app = express();
const { OrderModel } = require("./Models/Order");
const { HoldingModel } = require("./Models/Holding");
const { PositionModel } = require("./Models/Position");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// app.use(
//     cors({
//         origin: [
//           "http://localhost:5174",
//             "http://beckend-zerodha-production.up.railway.app/login", // No trailing slash
//     ],
//     methods: ["GET", "POST", "PUT"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true, // Make sure this is set if you're using cookies or tokens
// })
// );

app.use(cors({
  origin: true, // Dynamically reflect the request origin
  credentials: true,
}));

app.options("*", cors()); // Handle preflight requests

app.use(bodyParser.json());
app.use(cookieParser());

const PORT = 3002;
const url = process.env.MONGO_URL;


app.get("/auth", (req, res) => {
  const token = req.cookies.token; // Assuming token is stored in cookies

  if (!token) {
    return res.json({ isAuthenticated: false });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY); // Verify JWT token
    return res.json({ isAuthenticated: true, user: verified });
  } catch (error) {
    return res.json({ isAuthenticated: false });
  }
});
app.get("/holdings", async (req, res) => {
  let allHoldings = await HoldingModel.find({});
  res.json(allHoldings);
});
app.post("/newOrder", async (req, res) => {
  let newOrder = new OrderModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });
  newOrder.save();
  res.send("Order Saved");
});

app.get("/positions", async (req, res) => {
  let allPositions = await PositionModel.find({});
  res.json(allPositions);
});
app.post("/signup", Signup);
app.post("/login", Login);

app.listen(PORT, () => {
  console.log("I am here on " + PORT);
});

mongoose
  .connect(url)
  .then(() => console.log("Connected DB!"))
  .catch((err) => console.error("Connection error", err));