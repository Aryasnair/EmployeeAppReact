const express = require("express");

const router = express.Router();

router.use(express.json());

const userModel = require("../model/userData");

const jwt = require("jsonwebtoken"); //import jsonwebtoken

router.post("/login", async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email }); // the given email and db email is checked  and all data(whole docment save to this user)
  if (!user) {
    res.status(404).send({ message: "User not found" });
  }
  try {
    if (user.password == req.body.password) {
      // generating token when the password and email is matched
      const payload = {
        email: user.email,
        password: user.password,
        role: user.role,
      };
      const token = jwt.sign(payload, "employeeApp"); // employeeApp - secret key
      // fetched user password is checked with the given pass
      //sending this token to the frontend
      //store that in the front end session storage
      res.status(200).send({ message: "Login Successful", token: token });
    }
    else{
      res.status(400).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});



router.post("/adduser", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new userModel({
      email,
      password,
      role: "Employee",
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create" });
  }
});



module.exports = router;
