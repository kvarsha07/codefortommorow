const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secret_Key = process.env.JWT_SECRET;
const Refresh_TOKEN = process.env.Refresh_TOKEN;

const generateToken = (userId) => {
  return jwt.sign({ userId }, secret_Key, { expiresIn: "1m" });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, Refresh_TOKEN, { expiresIn: "7d" });
};

module.exports = { generateToken, generateRefreshToken };
