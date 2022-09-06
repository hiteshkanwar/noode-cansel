const express = require("express");
const Contact = require("../models/model");
const { sendEmail } = require("../utils/sendEmail");
const router = express.Router();

//Post Method
router.post("/contact", async (req, res) => {
  const data = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    message: req.body.message,
  });

  try {
    const dataToSave = await data.save();
    if (dataToSave) {
      try {
        const result = await sendEmail({
          email: req.body.email,
          subject: "Hello World!",
          message: req.body.message,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });
        res
          .status(200)
          .json({ email: "Email sent", result, ContactData: dataToSave });
      } catch (err) {
        res.send({ email: "Email not sent", ContactData: dataToSave });
        // next(err);
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/contact", (req, res) => {
  res.send("Get All API");
});

module.exports = router;
