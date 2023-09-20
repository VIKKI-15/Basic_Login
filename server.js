const express = require("express");
const mongoose = require("mongoose");
const mongodb = "mongodb://127.0.0.1:27017/login";
const UserModel = require("./models/user.model");
const app = express();

app.use(express.static("public"));

//Middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//connection to Mongoose
mongoose
  .connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log("Unable to connect:", error);
  });

// const { check, validationResult } = require("express-validator");

// Route to LoginPage
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const newUser = new UserModel({
    name: username,
    pass: password,
  });
  //Saving the person Information
  newUser
    .save()
    .then((savedPerson) => {
      console.log("saved person:", savedPerson);
      res.sendFile(__dirname + "/public/thank.html");
    })
    .catch((error) => {
      console.log("Error saving person:", error);
    });
});

// Route to NoPage
app.get("/", (req, res) => {
  res.status(404);
  res.send(
    " <h1 align='center' margin='auto' >Error 404: Resource not found</h1>"
  );
});

//Server Listen
const port = 3000;
app.listen(port, () => {
  console.log("Server is listening on port ", port);
});

// //Validation Array
// var loginValidate = [
//   // Check Username
//   check("username", "Username Must Be an Email Address")
//     .isEmail()
//     .trim()
//     .escape()
//     .normalizeEmail(),

//   // Check Password
//   // check("password")
//   //   .isLength({ min: 8 })
//   //   .withMessage("Password Must Be at Least 8 Characters")
//   //   .matches("[0-9]")
//   //   .withMessage("Password Must Contain a Number")
//   //   .matches("[A-Z]")
//   //   .withMessage("Password Must Contain an Uppercase Letter")
//   //   .trim()
//   //   .escape(),
// ];

// app.post("/login", loginValidate, (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({ errors: errors.array() });
//   } else {
//     let username = req.body.username;
//     let password = req.body.password;
//     res.send(
//       `<b>Welcome  ${username}, you have Logged in successfully! <br><br>Your Login Credentials are <b> Username </b>:${username} <b> Password </b> : ${password} `
//     );
//   }
// });
