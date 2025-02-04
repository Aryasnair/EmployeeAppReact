const express = require("express");

const router = express.Router();

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

const jwt = require("jsonwebtoken");

const employeeModel = require("../model/employeeData");

function verifytoken(req, res, next) {
  // extracting the token from headers
  let token = req.headers.token;
  try {
    if (!token) throw "Unauthorized access";
    else {
      let payload = jwt.verify(token, "employeeApp");
      if (!payload) throw "Unauthorized access";
      next();
      //if there is no issues in varify token then move on to next req
    }
  } catch (error) {
    console.log(error);
  }
}

//get
router.get("/employees", verifytoken, async (req, res) => {
  try {
    const data = await employeeModel.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send("Data not found");
  }
});

//post
router.post("/addemployee", verifytoken, async (req, res) => {
  try {
    const item = new employeeModel(req.body);
    const savedItem = await item.save();
    res.status(200).json(item);
  } catch (error) {
    res.status(404).send("Post Unsuccessful");
  }
});

//put
router.put("/editemployee/:id", verifytoken, async (req, res) => {
  try {
    const data = await employeeModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({ message: "Update Successful" });
  } catch (error) {
    res.status(404).send("Update Unsuccessful");
  }
});

//delete
router.delete("/deleteemployee/:id", verifytoken, async (req, res) => {
  try {
    const data = await employeeModel.findByIdAndDelete(req.params.id);
    if (data) {
      res.status(200).send("Delete Successful");
    }
  } catch (error) {
    res.status(404).send("Delete Unsuccessful");
  }
});

module.exports = router;
