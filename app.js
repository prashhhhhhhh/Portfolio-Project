const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyparser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const sendGridTransporter = require("nodemailer-sendgrid-transport");

require("dotenv").config();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport(
  sendGridTransporter({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);

app.get("/test", (req, res) => {
  res.send("Hello react and node js");
});

app.post("/sendemail", (req, res) => {
  const { name, email, jobtypes, message } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Please add your name" });
  }

  if (!email) {
    return res.status(400).json({ error: "Please add your email" });
  }

  if (!jobtypes) {
    return res.status(400).json({ error: "Please add jobtypes" });
  }

  if (!message) {
    return res.status(400).json({ error: "Please add message" });
  }

  transporter.sendMail({
    to: "prashantt7781@gmail.com",
    from: "prashantt7781@gmail.com",
    subject: "Job Offers",
    html: `

        <h5>Details Information:</h5>

        <ul>
        <li> <p>Name: ${name}</p> </li>
        <li> <p>E-Mail: ${email}</p> </li>
        <li> <p>Job Types: ${jobtypes}</p> </li>
        <li> <p>Message: ${message}</p> </li>

        </ul>

        `,
  });

  res.json({ success: "Your email has been sent" });
});

app.listen(PORT, (req, res) => {
  console.log("Server Connected");
});
