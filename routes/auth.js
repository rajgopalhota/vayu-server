const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const regtemp = require("../models/registration");

router.post("/register", async (req, res) => {
  const usercheck = await regtemp.findOne({ username: req.body.username });
  const emailcheck = await regtemp.findOne({ email: req.body.email });
  const phonecheck = await regtemp.findOne({ phone: req.body.phone });
  if (usercheck == null && emailcheck == null && phonecheck == null) {
    const saltpwd = await bcrypt.genSalt(10);
    console.log(saltpwd);

    // Hash the password using the generated salt
    const securepassword = await bcrypt.hash(req.body.password, saltpwd);

    const signupuser = new regtemp({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: securepassword,
    });
    signupuser
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((e) => {
        res.json(e);
      });
  } else if (usercheck != null) {
    res.send("userexist");
  } else if (phonecheck != null) {
    res.send("phoneexist");
  } else if (emailcheck != null) {
    res.send("emailexist");
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await regtemp.findOne({ phone: req.body.phone });
    if (!user) {
      return res.send("newuser");
    }
    const passwordCheck = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(passwordCheck);
    if (!passwordCheck) {
      return res.send("invalid");
    } else {
      const { username, email, phone, role, date } = user;

      // Create a JSON object with the desired fields
      const userData = {
        username,
        email,
        phone,
        role,
        date,
      };
      res.status(200).send({
        message: "Login Successful",
        user: userData,
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
