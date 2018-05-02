require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const nedb = require("nedb");
const crypto = require("crypto");
const { promisify } = require("util");
const connection = require("./server/connection");
const app = express();

const BCRYPT_SALT_ROUNDS = 10;

const Users = new nedb({ filename: "data/users.json", autoload: true });
app.use(bodyParser.json());
app.use(express.static("www"));

/**
 * Authentication endpoints.
 */
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await promisify(Users.findOne.bind(Users))({ email });
  const hashedPassword = crypto
    .createHmac("sha256", process.env.HASH_SECRET)
    .update(password)
    .digest("hex");
  if (user && hashedPassword === user.password) {
    return res.json({
      user: { email, password },
      token: await jwt.sign({ id: 1 }, process.env.JWT_SECRET)
    });
  } else {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }
});

const { PORT, HOSTNAME } = process.env;

const server = app.listen(parseInt(PORT), HOSTNAME, () => {
  console.log(`Asteroids server listening on ${HOSTNAME}:${PORT}`);
});

connection(server);
