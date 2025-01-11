const express = require("express");
const checkoutdata = require("../model/checkout");
const cartdata = require("../model/cart");
const router = express.Router();
const nodemailer = require("nodemailer");

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  secure: false, // use SSL
  auth: {
    user: "estifk2@gmail.com",
    pass: "estifbezamahi",
  },
});

// POST route for checkout
router.post("/", async (req, res) => {
  const { data, totPrice } = req.body;

  // Validate the input data
  if (
    !data ||
    !data.fullname ||
    !data.email ||
    !data.postalcode ||
    !data.city
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Create checkout data
    const addeddata = await checkoutdata.create({
      ...data,
      totPrice: totPrice,
    });

    // Clear the cart
    await cartdata.deleteMany({});
    const cartItems = await cartdata.find({});

    // Prepare the email options
    const mailOptions = {
      from: `${data.email}`,
      to: "estifk2@gmail.com",
      subject: "Order Confirmation",
      text: `Hello ${data.fullname},\n\nYour order has been placed successfully. Total price: ${totPrice}\n\nThank you for shopping with us!`,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    // Send the response to the client
    res.status(200).json({
      message:
        "Your order has been placed. A confirmation email will be sent to you shortly.",
      checkoutData: addeddata,
      clearedCart: cartItems,
    });
  } catch (err) {
    console.error("Error processing checkout:", err);
    res.status(500).json({ message: "Server error, try again later." });
  }
});

module.exports = router;
