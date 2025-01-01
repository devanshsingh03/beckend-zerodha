const User = require("./Models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "Token not found" });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.json({
          status: false,
          message: "Token is invalid or expired",
        });
      }

      const user = await User.findById(data.id);
      if (user) {
        req.user = user; // Attach the user to the request object for further use
        return res.json({ status: true, user: user.username });
      } else {
        return res.json({ status: false, message: "User not found" });
      }
    });
  } catch (error) {
    console.error("Error in user verification middleware:", error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

module.exports = { userVerification };