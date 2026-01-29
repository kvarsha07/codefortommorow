const User = require("../models/user");
const bcrypt = require("bcrypt");
const Refresh_TOKEN = process.env.Refresh_TOKEN;
const jwt = require("jsonwebtoken");
const { generateToken, generateRefreshToken } = require("../utils/token");
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashed,
    });

    return res.status(201).json({ msg: "Registerd Successfull" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "invalidCredencial" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "invalidCredencial" });

    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    return res.status(200).json({ msg: "login ", accessToken, refreshToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal error" });
  }
};

const refereshToken = (req, res) => {
  const { refereshToken } = req.body;

  if (!refereshToken) {
    return res.status(401).json({ msg: "Refresh token required" });
  }

  jwt.verify(refereshToken, Refresh_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: "Invalid referesh token " });
    }

    const newAccessToken = generateToken(decoded.userId);
    res.json({
      accessToken: newAccessToken,
    });
  });
};

module.exports = { registerUser, loginUser, refereshToken };
